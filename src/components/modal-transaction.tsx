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
    <AlertDialogContent className="bg-gray-50 lg:py-9 lg:px-12">
      <AlertDialogHeader>
        <AlertDialogCancel className="absolute border-none shadow-none w-fit right-2 top-2">
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
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
          />
          <div className="flex flex-col gap-4 lg:items-center lg:flex-row">
            <input
              type="text"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(handlePrice(e.target.value).priceInBRL)}
              className="flex-1 w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md lg:w-auto"
            />

            <div className="flex space-x-2 items-top">
              <Checkbox
                id="anual"
                className=""
                checked={isAnnual}
                onCheckedChange={(e) => setIsAnnual(!!e)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="anual"
                  className="flex-1 block text-sm font-medium leading-none cursor-pointer text-blue-950"
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
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
          />

          <div>
            <label
              className="block text-sm font-semibold text-left text-blue-950"
              htmlFor="date"
            >
              Dia da cobrança
            </label>
            <input
              id="date"
              type="date"
              pattern="dd/mm"
              placeholder="Data da assinatura"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction
          onClick={() => onAdd(getFormValues())}
          className="flex items-center justify-center w-full py-4 font-semibold text-white h-14 bg-emerald-500 hover:bg-emerald-600"
        >
          <span>Adicionar</span>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
