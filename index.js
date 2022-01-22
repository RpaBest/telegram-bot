'use strict';


const { 
    Telegraf, Markup, Telegram
 } = require('telegraf');
require('dotenv').config()
const dataBase = require('./const')
const keyboard = require('./keyboard')
const bot = new Telegraf(process.env.BOT_TOKEN)
const getMainKeyboard = keyboard.getMainKeyboard()
const getToMainKeyboard = keyboard.getToMainKeyboard()
const getDocumentFlow = keyboard.getDocumentFlow()
const FinancialQuestion = keyboard.FinancialQuestion()

let passport = 0







    bot.start(async (ctx) => {
        try{
             await ctx.replyWithHTML(`Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}! Выбери раздел`,  getMainKeyboard)
        } catch(e) {
            console.error(e);
        }  
})


bot.help((ctx) => ctx.reply(dataBase.commands))

bot.hears('Финансовый вопрос', async ctx => {
        await ctx.reply('Финансовый вопрос', FinancialQuestion)

        bot.hears('Будет ли сегодня зарплата?',async ctx => {
            await ctx.reply(`Согласно Трудовому договору заработная плата выплачивается два раза в месяц 29 и 14 числа. 
При совпадении дня выплаты с выходным или нерабочим праздничным днем выплата заработной платы производится накануне этого дня.`)

        })

        bot.hears('Я не получил заработную плату (деньги, аванс)', async ctx => {
            await ctx.reply('Укажите пожалуйста серию и номер вашего паспорта (далее включается алгоритм поиска информации с возможными вариантами ответа):')
            if (passport != 0) {
                ctx.reply(`Вы указывали паспорт ранее, выполняю поиск по базе данных`)
            } else {
                bot.on('text', (ctx) => {
                    if(!isNaN(ctx.update.message.text)){
                        passport = ctx.update.message.text;
                        return ctx.reply('Данные приняты, ожидаите ответа(запускается скрипт поиска по бд))')
                 } })
            }
        })

        bot.hears('Я получил мало денег', async ctx => {
            await ctx.reply('Укажите пожалуйста серию и номер вашего паспорта (далее включается алгоритм поиска информации с возможными вариантами ответа):')
            if (passport != 0) {
                ctx.reply(`Вы указывали паспорт ранее, выполняю поиск по базе данных`)
            } else {
                bot.on('text', (ctx) => {
                    if(!isNaN(ctx.update.message.text)){
                        passport = ctx.update.message.text;
                        return ctx.reply('Данные приняты, ожидаите ответа(запускается скрипт поиска по бд))')
                    }})
                }
        })
})



bot.hears('Документооборот', async ctx => {
    try {await ctx.reply('Документооборот', getDocumentFlow)

        bot.hears('Справка по кори', async ctx => {
        await ctx.reply('Укажите пожалуйста серию и номер вашего паспорта (далее включается алгоритм поиска информации с возможными вариантами ответа):')
        if (passport != 0) {
            ctx.reply(`Вы указывали паспорт ранее, выполняю поиск по базе данных`)
            return  ctx.replyWithDocument({
                        source: './img/1.jpg'
                    })
        } else {
            bot.on('text', (ctx) => {
                if(!isNaN(ctx.update.message.text)){
                    passport = ctx.update.message.text
                    ctx.reply('Данные приняты, ожидаите ответа(запускается скрипт поиска по бд))')
                    return  ctx.replyWithDocument({
                        source: './img/1.jpg'
                    })
             } })
        }
        })
    } catch (e) {
        console.log(e)
    }
})


bot.hears('Организационный вопрос',  async ctx => {
    try {
        await ctx.replyWithHTML(`<b>Вопросы:</b>\n ${dataBase.textQuestion}\n\n <b>Ответы:</b>\n ${dataBase.answer}`, getToMainKeyboard)
    } catch(e) {
        console.log(e)
    }
})

bot.hears('На главную', ctx => {
    try {ctx.reply('Выбери раздел', getMainKeyboard)
    } catch (e) {
        console.log(e)
    }
 })

bot.launch()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


  //16 часов работы
