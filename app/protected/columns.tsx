'use client'

import { ColumnDef } from '@tanstack/react-table'

export type UserRecord = {
  id: string
  author?: string | null
  consultant?: string | null
  payment_type?: string | null
  status?: string | null
  to_delete?: string | null
  discount?: string | null
  item?: string | null
  fullname?: string | null
  given_date?: string | Date | null
  accepted_date?: string | Date | null
  payed?: string | null
  loan?: string | null
}

export const columns: ColumnDef<UserRecord>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Автор',
    accessorKey: 'author',
  },
  {
    header: 'Консультант',
    accessorKey: 'consultant',
  },
  {
    header: 'Тип оплаты',
    accessorKey: 'payment_type',
  },
  {
    header: 'Статус',
    accessorKey: 'status',
  },
  {
    header: 'Удалить',
    accessorKey: 'to_delete',
  },
  {
    header: 'Скидка',
    accessorKey: 'discount',
  },
  {
    header: 'Товар',
    accessorKey: 'item',
  },
  {
    header: 'ФИО',
    accessorKey: 'fullname',
  },
  {
    header: 'Дата получения',
    accessorKey: 'given_date',
  },
  {
    header: 'Дата принятия',
    accessorKey: 'accepted_date',
  },
  {
    header: 'Оплачено',
    accessorKey: 'payed',
  },
  {
    header: 'Задолженность',
    accessorKey: 'loan',
  },
]
