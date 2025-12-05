import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { AddressDisplay } from './AddressDisplay'

const meta = {
  title: 'Organism/AddressDisplay',
  component: AddressDisplay,
  parameters: {
    layout: 'padded',
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AddressDisplay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    address: '69668170DAFB724B',
    copied: false,
    onCopy: () => console.log('Copy clicked'),
    onModifyReceipt: () => console.log('Modify receipt clicked'),
  },
}

export const Interactive: Story = {
  render: (args) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
      setCopied(true)
      args.onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <AddressDisplay
        address={args.address}
        copied={copied}
        onCopy={handleCopy}
        onModifyReceipt={args.onModifyReceipt}
      />
    )
  },
  args: {
    address: '69668170DAFB724B',
    copied: false,
    onCopy: () => console.log('Copy clicked'),
    onModifyReceipt: () => console.log('Modify receipt clicked'),
  },
}

