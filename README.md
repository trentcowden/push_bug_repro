To reproduce:

1. Install packages: `yarn`
2. Run script using tsx: `tsx push_repro.ts`

This script will attempt to send out 16 test notifications to a specified push token and then attempt to send out 17 test notifications to the same push token. All 33 notifications will be delivered, but only the 17 chunk will throw an error and not produce any tickets.