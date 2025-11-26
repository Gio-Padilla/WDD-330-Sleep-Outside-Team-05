
import alertsData from './alerts.json';

export default class Alert {
  constructor() {
    this.alerts = alertsData;
    this.mainElement = document.querySelector('main'); 

    this.renderAlerts();
  }

  renderAlerts() {
    if (this.alerts && this.alerts.length > 0) {
      const alertListSection = document.createElement('section');
      alertListSection.classList.add('alert-list');

      this.alerts.forEach(alert => {
        const alertParagraph = document.createElement('p');
        alertParagraph.textContent = alert.message;
        alertParagraph.style.backgroundColor = alert.background;
        alertParagraph.style.color = alert.color;
        alertParagraph.style.padding = '10px'; 
        alertParagraph.style.textAlign = 'center';

        alertListSection.appendChild(alertParagraph);
      });

      this.mainElement.prepend(alertListSection); 
    }
  }
}
