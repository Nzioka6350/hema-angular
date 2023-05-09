import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { NotificationsService } from "../notifications.service";

export interface Notification {
    "id": string,
    "type": string,
    "notifiable_type": string,
    "notifiable_id": string,
    "data": {
        "title": string,
        "description": string
    },
    "read_at": null | Date,
    "created_at": Date,
    "updated_at": Date
}

export const notificationResolver: ResolveFn<Notification> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(NotificationsService).getNotification(route.paramMap.get('notification_id')!);
    };
