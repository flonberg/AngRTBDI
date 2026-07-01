import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
type Beam = {
  CurrentFractionNumber: string;
  ReferencedBeamNumber: string;
  ReferencedFractionGroupNumber: string;
};

@Component({
  selector: 'app-get-rtbdi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-rtbdi.component.html',
  styleUrl: './get-rtbdi.component.css'
})

export class GetRTBDIComponent {
  private http = inject(HttpClient); 
  phpData: any;
  beams: Beam[] = [];
  ngOnInit() {
    this.fetchRTBCIData();
  }

  fetchRTBCIData() {
    const phpApiUrl = 'https://whiteboard.partners.org/esb/_dev_/dicom/testRTBDIjson.php'; 
    this.http.get<any>(phpApiUrl).subscribe({
      next: (response) => {
        this.phpData = response;
        var beam = {} as Beam;  
        var startBeam = false;
        console.log("type of phpData:", typeof this.phpData);
        for (const [key, value] of Object.entries(this.phpData)) {
          if (typeof value !== 'symbol' && String(value).includes('0074,1022')) {
            console.log(`${key}: ${value}`);
            beam = {} as Beam;
            startBeam = true;
          }
          if (typeof value !== 'symbol' && String(value).includes('3008,0022')) 
              beam.CurrentFractionNumber = this.getStringInBrackets(String(value)) || '';
          if (typeof value !== 'symbol' && String(value).includes('300c,0022')) 
              beam.ReferencedFractionGroupNumber = this.getStringInBrackets(String(value)) || '';
          if (typeof value !== 'symbol' && String(value).includes('300c,0006')) {
              beam.ReferencedBeamNumber = this.getStringInBrackets(String(value)) || '';
              this.beams.push(beam);
          }
   
          
        }
        console.log("beams:", this.beams);
      },
      error: (err) => console.error('Failed to reach PHP script:', err)
    });
  }
  getStringInBrackets(input: string): string | null {
    const match = input.match(/\[(.*?)\]/);
    return match ? match[1] : null;
  }
}
