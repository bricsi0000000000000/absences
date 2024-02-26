export enum AbsenceReason {
  Holiday = 0,
  PaidLeave = 1,
  NonPaidLeave = 2,
  BusinessTravel = 3,
  HomeOffice = 4
}

export const AbsenceReasonDisplayName = {
  [AbsenceReason.Holiday]: 'Holiday',
  [AbsenceReason.PaidLeave]: 'Paid Leave',
  [AbsenceReason.NonPaidLeave]: 'Non-Paid Leave',
  [AbsenceReason.BusinessTravel]: 'Business Travel',
  [AbsenceReason.HomeOffice]: 'Home Office'
};

export const AbsenceReasonOptions: { key: number, value: string }[] = Object.entries(AbsenceReasonDisplayName).map(([key, value]) => ({ key: parseInt(key), value }));