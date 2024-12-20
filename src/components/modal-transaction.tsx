'use client'

import type { Transaction } from '@/app/page'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { getPrice } from '@/utils/currecy'
import { X } from 'lucide-react'
import { useState } from 'react'

interface ModalTransactionProps {
  onAdd: (payload: Transaction) => void
}

export function ModalTransaction({ onAdd }: Readonly<ModalTransactionProps>) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('R$ 0,00')
  const [isAnnual, setIsAnnual] = useState(false)
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')

  function getFormValues() {
    const payload = {
      title,
      price,
      category,
      date,
      id: new Date().getTime().toString(),
    }

    if (isAnnual) {
      Object.assign(payload, {
        price: getPrice(handlePrice(price).priceInCents / 12),
      })
    }

    clearForm()

    return payload
  }

  function clearForm() {
    setTitle('')
    setPrice('R$ 0,00')
    setIsAnnual(false)
    setCategory('')
    setDate('')
  }

  function handlePrice(value: string) {
    const valueInCents = Number(value.replace(/\D/g, '')) / 100

    const valueInBRL = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valueInCents)

    return {
      priceInBRL: valueInBRL,
      priceInCents: valueInCents,
    }
  }

  return (
    <AlertDialogContent className="bg-gray-50 py-9 px-12">
      <AlertDialogHeader>
        <AlertDialogCancel className="border-none shadow-none w-fit absolute right-2 top-2">
          <X className="text-gray-400" size={20} />
        </AlertDialogCancel>
        <AlertDialogTitle className="font-semibold text-blue-950">
          Cadastrar mensalidade
        </AlertDialogTitle>

        <AlertDialogDescription>
          Preencha os campos abaixo para cadastrar uma nova mensalidade.
        </AlertDialogDescription>

        <div className="flex flex-col gap-3 my-8">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 bg-gray-100 rounded-md px-4 py-2 w-full"
          />
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(handlePrice(e.target.value).priceInBRL)}
              className="border border-gray-300 bg-gray-100 rounded-md px-4 py-2 flex-1"
            />

            <div className="items-top flex space-x-2">
              <Checkbox
                id="anual"
                checked={isAnnual}
                onCheckedChange={(e) => setIsAnnual(!!e)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="anual"
                  className="block text-sm font-medium leading-none flex-1 cursor-pointer text-blue-950"
                >
                  É o preço anual?
                </label>
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 bg-gray-100 rounded-md px-4 py-2 w-full"
          />
          <input
            type="date"
            placeholder="Data da assinatura"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 bg-gray-100 rounded-md px-4 py-2 w-full"
          />
        </div>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction
          onClick={() => onAdd(getFormValues())}
          className="h-14 bg-emerald-500 hover:bg-emerald-600 font-semibold py-4 text-white w-full items-center flex justify-center"
        >
          <span>Adicionar</span>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
