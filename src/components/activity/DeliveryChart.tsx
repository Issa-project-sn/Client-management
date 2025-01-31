import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  format, 
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear,
  parseISO
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { DeliveryDetails } from '../../types/delivery';

type TimeRange = 'day' | 'week' | 'month' | 'year';

interface Props {
  deliveries: DeliveryDetails[];
  startDate: Date;
  endDate: Date;
}

export const DeliveryChart: React.FC<Props> = ({ deliveries, startDate, endDate }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('day');
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const generateChartData = () => {
      let start: Date;
      let end: Date;
      let intervals: Date[];
      let formatString: string;
      let compareFunction: (date1: Date, date2: Date) => boolean;

      // Ensure we have valid Date objects
      const validStartDate = startDate instanceof Date ? startDate : new Date(startDate);
      const validEndDate = endDate instanceof Date ? endDate : new Date(endDate);

      switch (timeRange) {
        case 'day':
          start = startOfDay(validStartDate);
          end = endOfDay(validEndDate);
          formatString = 'dd MMM';
          compareFunction = isSameDay;
          intervals = eachDayOfInterval({ start, end });
          break;
        case 'week':
          start = startOfWeek(validStartDate, { locale: fr });
          end = endOfWeek(validEndDate, { locale: fr });
          formatString = "'Sem' w";
          compareFunction = isSameWeek;
          intervals = eachWeekOfInterval({ start, end });
          break;
        case 'month':
          start = startOfMonth(validStartDate);
          end = endOfMonth(validEndDate);
          formatString = 'MMM yyyy';
          compareFunction = isSameMonth;
          intervals = eachMonthOfInterval({ start, end });
          break;
        case 'year':
          start = startOfYear(validStartDate);
          end = endOfYear(validEndDate);
          formatString = 'yyyy';
          compareFunction = isSameYear;
          intervals = eachYearOfInterval({ start, end });
          break;
        default:
          start = startOfDay(validStartDate);
          end = endOfDay(validEndDate);
          formatString = 'dd MMM';
          compareFunction = isSameDay;
          intervals = eachDayOfInterval({ start, end });
      }

      const data = intervals.map(date => {
        const count = deliveries.filter(delivery => {
          const deliveryDate = delivery.createdAt instanceof Date 
            ? delivery.createdAt 
            : new Date(delivery.createdAt);
          return compareFunction(deliveryDate, date);
        }).length;

        return {
          date,
          count,
          label: format(date, formatString, { locale: fr })
        };
      });

      setChartData(data);
    };

    generateChartData();
  }, [deliveries, timeRange, startDate, endDate]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Évolution des livraisons</h2>
        <p className="mt-1 text-sm text-gray-500">
          Visualisez le nombre de livraisons acceptées au fil du temps
        </p>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2">
          {(['day', 'week', 'month', 'year'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-colors
                ${timeRange === range
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              {range === 'day' && 'Jour'}
              {range === 'week' && 'Semaine'}
              {range === 'month' && 'Mois'}
              {range === 'year' && 'Année'}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00853F" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#00853F" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="label" 
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickMargin={10}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number) => [`${value} livraison${value > 1 ? 's' : ''}`, 'Nombre']}
              labelFormatter={(label: string) => `${label}`}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#00853F"
              strokeWidth={2}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};