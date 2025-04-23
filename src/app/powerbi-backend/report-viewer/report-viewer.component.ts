import {Component, OnInit} from '@angular/core';
import * as powerbi from 'powerbi-client';
import {models, service} from 'powerbi-client';
import {PowerbiService} from "../powerbi.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent implements OnInit {

  reports: any[] = [];
  selectedReportId: string = '';
  isLoading = false;

  private powerbiServiceInstance: service.Service;

  constructor(
    private powerbiService: PowerbiService,
    private snackBar: MatSnackBar
  ) {
    this.powerbiServiceInstance = new service.Service(
      powerbi.factories.hpmFactory,
      powerbi.factories.wpmpFactory,
      powerbi.factories.routerFactory
    );
  }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    this.powerbiService.getReports().subscribe({
      next: res => {
        this.reports = res;
      },
      error: err => {
        this.showError('Failed to load reports');
      }
    });
  }

  embedReport(reportId: string) {
    if (!reportId) {
      this.showError('Please select a report first');
      return;
    }

    this.isLoading = true;

    this.powerbiService.getEmbedDetails(reportId).subscribe({
      next: res => {
        const embedConfig: models.IReportEmbedConfiguration = {
          type: 'report',
          tokenType: models.TokenType.Aad,
          accessToken: res.embedToken,
          embedUrl: res.embedUrl,
          id: res.reportId,
          permissions: models.Permissions.All,
          settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true
          }
        };

        const reportContainer = document.getElementById('reportContainer');

        // Clear previous embeds if any
        this.powerbiServiceInstance.reset(reportContainer!);

        // Embed the report
        this.powerbiServiceInstance.embed(reportContainer!, embedConfig);

        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        this.showError('Failed to load embed details');
      }
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
