import { Command } from '@nestjs/cqrs' 

export class UpdateEventCommand extends Command<void> {
    id!: number 
    title?: string     
    content?: string     
    image?: string     
    date?: string     
    address?: string     
    categoryId?: number     
}
