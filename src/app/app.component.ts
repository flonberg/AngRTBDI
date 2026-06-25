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
        console.log("type of phpData:", typeof this.phpData);
        for (const [key, value] of Object.entries(this.phpData)) {
          if (this.canBeString(value) && String(value).includes('0074,1022')) {
            console.log(`${key}: ${value}`);
          }
        }
     //   console.log('response:', this.phpData);
      },
      error: (err) => console.error('Failed to reach PHP script:', err)
    });
  }
 canBeString(value: unknown) {
  if (typeof value !== 'symbol') {
    const safeString = String(value); // Outputs "null", "123", "[object Object]"
    return true
    }
  else
  return false  
  }
}
