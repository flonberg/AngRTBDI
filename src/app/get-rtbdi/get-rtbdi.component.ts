import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-rtbdi',
  standalone: true,
  imports: [],
  templateUrl: './get-rtbdi.component.html',
  styleUrl: './get-rtbdi.component.css'
})
export class GetRTBDIComponent {
  private http = inject(HttpClient); 
  phpData: any;
  ngOnInit() {
    this.fetchPhpData();
  }

  fetchPhpData() {
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
