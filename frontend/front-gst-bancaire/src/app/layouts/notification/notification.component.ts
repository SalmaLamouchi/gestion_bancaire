import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{

  notifications: any[] = [];

  constructor(private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.loadNotifications();
  }


  // redirectToHome() {
  //   this.router.navigate(['/home']);
  // }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      (notifications: any[]) => {
        this.notifications = notifications;
      },
      (error) => {
        console.log(error);
        // Handle error here, e.g. show an error message to the user
      }
    );
  }

}