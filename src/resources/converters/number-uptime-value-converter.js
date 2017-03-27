export class NumberUptimeValueConverter {
  toView(value) {
    if (typeof value !== 'number') {
      logger.error(`Unrecognized value: ${value}`);
      return;
    }

    const units = [
      { text: 'w', seconds: 604800 },
      { text: 'd', seconds: 86400  },
      { text: 'h', seconds: 3600   },
      { text: 'm', seconds: 60     },
      { text: 's', seconds: 1      }
    ]
    let uptime = '';

    for (let unit of units) {
      const count = Math.floor(value / unit.seconds);
      if (count > 0) {
        uptime += `${count}${unit.text} `;
        value  -= count * unit.seconds;
      }
    }

    return uptime;
  }
}
