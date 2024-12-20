'use client'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TableTransactions } from '@/components/table-transactions'
import { getValueFromBRL } from '@/utils/currecy'

import Image from 'next/image'
import { useState } from 'react'

export interface Transaction {
  title: string
  price: string
  category: string
  date: string
  id: string
}

const storeKey = '@mensalize::transactions'

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== 'undefined') {
      const data = window?.localStorage?.getItem(storeKey)

      if (data) {
        return JSON.parse(data)
      }
    }

    return []
  })

  function addTransaction(data: Transaction) {
    if (!data.title || !data.price || !data.category) {
      return
    }

    localStorage.setItem(storeKey, JSON.stringify([...transactions, data]))

    setTransactions([...transactions, data])
  }

  function deleteTransaction(id: string) {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id,
    )

    localStorage.setItem(storeKey, JSON.stringify(updatedTransactions))
    setTransactions(updatedTransactions)
  }

  const totalMonthly = transactions.reduce((acc, transaction) => {
    const value = getValueFromBRL(transaction.price)

    return acc + value
  }, 0)

  const totalYearly = totalMonthly * 12

  return (
    <main className="bg-gray-100 min-h-svh flex flex-col">
      <Header onAddTransaction={addTransaction} />
      <section className="flex flex-col lg:flex-row container px-2 mt-4 lg:mt-0 mx-auto gap-4 lg:gap-8">
        <div className="hover:bg-gray-50 bg-white shadow-md rounded-lg overflow-hidden lg:-mt-20 flex-1 px-12 py-6">
          <div className="text-blue-950 flex items-center justify-between">
            Mensal
            <Image src="/outcomes.svg" alt="Saída" width={40} height={40} />
          </div>
          <div className="mt-6 flex justify-between items-end">
            <div className="text-3xl text-blue-950">
              R${' '}
              <span className="font-semibold">
                {totalMonthly.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <span className="">/ao mês</span>
          </div>
        </div>
        <div className="hover:bg-gray-50 bg-white shadow-md rounded-lg overflow-hidden lg:-mt-20 flex-1 px-12 py-6">
          <div className="text-blue-950 flex items-center justify-between">
            Anual
            <Image src="/outcomes.svg" alt="Saída" width={40} height={40} />
          </div>
          <div className="mt-6 flex justify-between items-end">
            <div className="text-3xl text-blue-950">
              R${' '}
              <span className="font-semibold">
                {totalYearly.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <span className="">/ao ano</span>
          </div>
        </div>
      </section>
      <section className="container px-2 mx-auto mt-16 overflow-x-auto mb-8">
        <TableTransactions
          transactions={transactions}
          onDelete={(id) => deleteTransaction(id)}
        />
      </section>

      <Footer />
    </main>
  )
}
