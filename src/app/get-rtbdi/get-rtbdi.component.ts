import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { RunScriptService } from '../run-Script.service';
//import { execFile, spawn } from 'node:child_process';
import { FormsModule } from '@angular/forms';

type Beam = {
  CurrentFractionNumber: string;
  ReferencedBeamNumber: string;
  ReferencedFractionGroupNumber: string;
};

@Component({
  selector: 'app-get-rtbdi',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './get-rtbdi.component.html',
  styleUrl: './get-rtbdi.component.css'
})

export class GetRTBDIComponent {
   output = '';  // <-- this line needs to be there
  selectedIndex: number | null = null;
  selectedValue: string | null = null
  selections: string[] = []; // selections[i] = 'treated' | 'partially-treated' | 'not-treated'
  private http = inject(HttpClient); 
  phpData: any;
  beams: Beam[] = [];
  constructor(private runScriptService: RunScriptService) {}
  ngOnInit() {
    this.fetchRTBCIData();
  }

  fetchRTBCIData() {
    const phpApiUrl = 'https://whiteboard.partners.org/esb/_dev_/dicom/testRTBDIjson.php'; 
    this.http.get<any>(phpApiUrl).subscribe({
      next: (response) => {
        this.phpData = response;
        this.saveResponseToFile(this.phpData, 'phpData.txt');
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
  private saveResponseToFile(data: any, filename: string) {
    // If the response is already a string (e.g. raw dump text), use it as-is.
    // If it's a JSON object, pretty-print it so the saved file is readable.
    const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }
  onSelect(i: number, value: string) {
    this.selections[i] = value;
    console.log(`Row ${i} set to ${value}`);
  }
submit() {
  if (this.selectedIndex === null || this.selectedValue === null) {
    this.output = 'Please select a beam status first.';
    return;
  }

  this.output = 'Running...'; // <-- immediate feedback that submit fired

  this.runScriptService.runScript(this.selectedIndex, this.selectedValue).subscribe({
    next: (res) => this.output = res.output || '(Script ran but returned no output)',
    error: (err) => this.output = `Error: ${err.message}`
  });
}
}
