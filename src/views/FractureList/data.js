import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    createdAt: 1555016400000,
    amputated: false,
    firstSurgicalApproach: 'Fixação Interna',
    associatedTraumaInjury: ['Lesão Vascular'],
    bone: 'N/A',
    recordNumber: '123456'
  },
  {
    id: uuid(),
    createdAt: 1555016400000,
    amputated: true,
    firstSurgicalApproach: 'Externa',
    associatedTraumaInjury: ['Amputação'],
    bone: 'Tíbia',
    recordNumber: '347098'
  },
  {
    id: uuid(),
    createdAt: 1555016400000,
    amputated: false,
    firstSurgicalApproach: 'Fixação Interna',
    associatedTraumaInjury: ['Lesão Vascular'],
    bone: 'Coxa',
    recordNumber: '546112'
  },
  {
    id: uuid(),
    createdAt: 1554930000000,
    amputated: false,
    firstSurgicalApproach: 'Fixação Interna',
    associatedTraumaInjury: ['Lesão Vascular'],
    bone: 'Tornozelo',
    recordNumber: '900871'
  },
  {
    id: uuid(),
    createdAt: 1554757200000,
    amputated: false,
    firstSurgicalApproach: 'Externa',
    associatedTraumaInjury: ['Lesão Nervosa', 'Lesão Vascular'],
    bone: 'Coxa',
    recordNumber: '765833'
  },
  {
    id: uuid(),
    createdAt: 1554670800000,
    amputated: false,
    firstSurgicalApproach: 'Fixação Interna',
    associatedTraumaInjury: ['Lesão Miotendinea'],
    bone: 'Tornozelo',
    recordNumber: '120956'
  },
  {
    id: uuid(),
    createdAt: 1554325200000,
    amputated: true,
    firstSurgicalApproach: 'Imobilização Gessada',
    associatedTraumaInjury: ['Lesão Vascular', 'Amputação'],
    bone: 'Antebraço',
    recordNumber: '221387'
  },
  {
    id: uuid(),
    createdAt: 1523048400000,
    amputated: false,
    firstSurgicalApproach: 'Imobilização Gessada',
    associatedTraumaInjury: ['Lesão Miotendinea', 'Lesão Nervosa'],
    bone: 'Tíbia',
    recordNumber: '100092'
  },
  {
    id: uuid(),
    createdAt: 100,
    amputated: false,
    firstSurgicalApproach: 'Imobilização Gessada',
    associatedTraumaInjury: ['Lesão Nervosa'],
    bone: 'Clavícula',
    recordNumber: '963852'
  },
  {
    id: uuid(),
    createdAt: 1522702800000,
    amputated: false,
    firstSurgicalApproach: 'Fixação Interna',
    associatedTraumaInjury: ['Lesão Vascular'],
    bone: 'Tíbia',
    recordNumber: '963851'
  }
];
