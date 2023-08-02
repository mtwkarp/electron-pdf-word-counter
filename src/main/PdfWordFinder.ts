// @ts-ignore
import { PdfReader } from 'pdfreader';
import fs from 'fs'

export default class PDFKeywordsFinder {
  async read(filePath: string, keywords: string[]): Promise<string> {
    return new Promise(async(resolve) => {
      const foundedWords: Record<string, { number: number }> = {};

      let result = '';

      fs.readFile(filePath, function(error, body) {
        new PdfReader().parseBuffer(body, (err: any, item: { text: string }) => {
          if (err) console.error('error:', err);
          else if (!item) {
            let foundWord = false;

            result += '\nВ даному документі знайдені наступні діючі речовини: ';

            for (const key in foundedWords) {
              result += `\nРечовина ${key} згадується ${foundedWords[key].number} раз.`;
              foundWord = true;
            }

            if (!foundWord) result = 'Я не знайшов жодного препарату в даному документі. Сорямба (або ні).';

            resolve(result);
          } else if (item.text) {
            const textLowerCase = item.text.toLowerCase();
            for (let i = 0; i < keywords.length; i++) {
              const word = keywords[i].toLowerCase();

              if (textLowerCase.includes(word)) {
                if (foundedWords[word]) {
                  foundedWords[word].number += 1;
                } else {
                  foundedWords[word] = { number: 1 };
                }
              }
            }
          }
        });
      });
    });
  }
}
