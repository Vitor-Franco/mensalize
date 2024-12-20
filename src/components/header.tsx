import type { Transaction } from '@/app/page'
import { Logo } from '@/components/logo'
import { ModalTransaction } from '@/components/modal-transaction'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'

import React from 'react'

interface HeaderProps {
  onAddTransaction: (payload: Transaction) => void
}

function Header({ onAddTransaction }: Readonly<HeaderProps>) {
  return (
    <header className="bg-teal-700 lg:h-[212px] text-red">
      <div className="container px-2 flex items-center justify-between mx-auto py-8 lg:pb-0 lg:pt-8">
        <Logo />

        <AlertDialog>
          <AlertDialogTrigger className="shadow bg-emerald-600 text-white px-4 py-2 rounded font-semibold">
            <span>Nova mensalidade</span>
          </AlertDialogTrigger>
          <ModalTransaction onAdd={onAddTransaction} />
        </AlertDialog>
      </div>
    </header>
  )
}

export { Header }
