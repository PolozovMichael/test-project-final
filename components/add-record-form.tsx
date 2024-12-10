'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createSupabaseClientAction } from '@/app/actions'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const recordFormSchema = z.object({
  id: z.string(),
  author: z.string().nullable(),
  consultant: z.string().nullable(),
  payment_type: z.string().nullable(),
  status: z.string().nullable(),
  to_delete: z.string().nullable(),
  discount: z.string().nullable(),
  item: z.string().nullable(),
  fullname: z.string().nullable(),
  given_date: z.string().nullable(),
  accepted_date: z.string().nullable(),
  payed: z.string().nullable(),
  loan: z.string().nullable(),
})

export default function AddRecordComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof recordFormSchema>>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: {
      id: '',
      author: '',
      consultant: '',
      payment_type: '',
      status: '',
      to_delete: '',
      discount: '',
      item: '',
      fullname: '',
      given_date: '',
      accepted_date: '',
      payed: '',
      loan: '',
    },
  })

  async function onSubmit(values: z.infer<typeof recordFormSchema>) {
    try {
      setIsLoading(true)
      const supabase = await createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      )
      const response = await supabase.from('data').insert(values)

      toast('Данные успешно сохранены!')
      router.push('/')
    } catch (error) {
      console.log(error)
      toast('Произошла ошибка!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Автор</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consultant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Консультант</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payment_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип оплаты</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Статус</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="given_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата выдачи</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value as unknown as
                      | string
                      | number
                      | readonly string[]
                      | undefined
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accepted_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата приема</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value as unknown as
                      | string
                      | number
                      | readonly string[]
                      | undefined
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Оплачено</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Долг</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{isLoading ? 'Отправка...' : 'Сохранить'}</Button>
      </form>
    </Form>
  )
}
