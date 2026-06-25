import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngRTBDU';
    // Use modern inject() instead of constructor injection
  private http = inject(HttpClient); 
  phpData: any;
   ngOnInit() {
    // Replace with the actual URL where your PHP script is hosted
    const phpApiUrl = 'https://whiteboard.partners.org/esb/_dev_/dicom/testRTBDIjson.php'; 

    this.http.get<any>(phpApiUrl).subscribe({
      next: (response) => {
        this.phpData = response;
        console.log('response:', response);
      },
      error: (err) => console.error('Failed to reach PHP script:', err)
    });
  }
}
