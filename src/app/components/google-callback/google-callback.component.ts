import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleService } from 'src/app/services/google.service';
import { ListService } from 'src/app/services/list.services';

@Component({
  selector: 'app-google-callback',
  templateUrl: './google-callback.component.html',
  styleUrls: ['./google-callback.component.css']
})
export class GoogleCallbackComponent implements OnInit {
  googleAuthSuccess: boolean = false;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: GoogleService,
    private listService: ListService
  ) { }

  ngOnInit(): void {
    this.googleAuthSuccess = true;

    this.route.queryParams.subscribe(params => {
      const code = encodeURIComponent(params['code']);
      const scope = encodeURIComponent(params['scope']);

      if (code && scope) {
        const parameters = `?code=${code}&scope=${scope}`;
        this.service.googleAuthCallback(parameters).subscribe(
          _ => {
            this.message = 'Connected with Google Tasks!';
            this.googleAuthSuccess = true;
          },
          error => {
            if (error.status === 200) {
              this.message = 'Connected with Google successfully!';
              this.googleAuthSuccess = true;
            }
            else {
              this.googleAuthSuccess = false;

              this.message = 'Error connecting with Google. Try again.';
            }
          });
      } else {
        this.message = 'Invalid data received from Google.';
      }
    });
  }

  importFromGoogleAPI(): void {
    this.listService.importFromGoogleAPI().subscribe(
      _ => {
        this.message = 'Imported tasks';
      },
      _ => {
        this.message = 'There was an error importing tasks. Try again later.';
      }
    );
  }

  exportFromGoogleAPI(): void {
    this.listService.exportFromGoogleAPI().subscribe(
      _ => {
        this.message = 'Exported tasks.';
      },
      _ => {
        this.message = 'There was an error exporting tasks. Try again later.';
      }
    );
  }
}
