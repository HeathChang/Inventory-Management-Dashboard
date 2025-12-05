import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Card } from './Card'

const meta = {
  title: 'Atom/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    imageUrl: 'https://via.placeholder.com/260x200',
    name: '기프티콘 상품명',
    description: '이것은 기프티콘 상품에 대한 설명입니다. 두 줄까지 표시됩니다.',
    validityPeriod: '2024.12.31까지',
  },
}

export const Interactive: Story = {
  args: {
    imageUrl: 'https://via.placeholder.com/260x200',
    name: '배송 아이템 상품명',
    description: '클릭하면 상세 정보를 볼 수 있습니다. 이 설명은 두 줄까지 표시되며, 더 긴 내용은 생략됩니다.',
    validityPeriod: '2025.01.15까지',
    onClick: () => {},
  },
}

