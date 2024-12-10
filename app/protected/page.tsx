import { createClient } from '@/utils/supabase/server'
import { Check, InfoIcon, Plus } from 'lucide-react'
import { redirect } from 'next/navigation'
import { DataTable } from './data-table'
import { columns } from './columns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import AddRecordComponent from '@/components/add-record-form'
import { toast } from 'sonner'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data: records } = await supabase.from('data').select('*')

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/sign-in')
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h1 className="text-4xl font-semibold">
        Система управления данными аренды строительного оборудования
      </h1>

      <div className="w-full flex justify-between items-center">
        <div className="bg-green-700 text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <Check size="16" strokeWidth={2} />
          <p>Ваши данные защищены и недоступны для других пользователей</p>
        </div>
        <Dialog>
          <DialogTrigger className="bg-green-700 rounded-md p-2 hover:bg-green-800">
            <div className="flex h-fit gap-2 items-center justify-between w-full">
              <p className="text-sm">Добавить запись</p>
              {/* <Plus size="16" strokeWidth={2} /> */}
            </div>
          </DialogTrigger>
          <DialogContent className="bg-black/80 max-h-[600px] overflow-auto">
            <DialogHeader>
              <DialogTitle>Добавить новую запись</DialogTitle>
              <DialogDescription>
                Введите данные в форму ниже и нажмите "Сохранить"
              </DialogDescription>
            </DialogHeader>
            <AddRecordComponent />
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">
          Текущие данные по пользователям
        </h2>
        <DataTable columns={columns} data={records as []} />
      </div>
    </div>
  )
}
