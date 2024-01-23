import { Component } from '@angular/core';

import { HealthKey, HealthDetails } from '../health.model';

@Component({
  selector: 'jhi-health-modal',
  templateUrl: './health-modal.component.html',
})
export class HealthModalComponent {
  health?: { key: HealthKey; value: HealthDetails };

  constructor() {}

  readableValue(value: any): string {
    if (this.health?.key === 'diskSpace') {
      // Should display storage space in an human readable unit
      const val = value / 1073741824;
      if (val > 1) {
        return `${val.toFixed(2)} GB`;
      }
      return `${(value / 1048576).toFixed(2)} MB`;
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  dismiss(): void {}
}
