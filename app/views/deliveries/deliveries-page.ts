import { NavigatedData, Page } from '@nativescript/core';
import { DeliveriesViewModel } from './deliveries-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new DeliveriesViewModel();
}

export function onCreateDelivery() {
    const viewModel = new DeliveriesViewModel();
    viewModel.onCreateDelivery();
}