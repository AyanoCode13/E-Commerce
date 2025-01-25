import { server$ } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";
import { withPulse } from "@prisma/extension-pulse/node";

export class Database {
  public static _instance: PrismaClient;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static getter that controls access to the singleton instance.
   *
   * This implementation allows you to extend the Singleton class while
   * keeping just one instance of each subclass around.
   */
  public static getinstance(): PrismaClient {
    this._instance = new PrismaClient().$extends(
        withPulse({
            apiKey: process.env.DATABASE_STREAM_KEY as string,
        })
    ) as unknown as PrismaClient;
    

    return Database._instance;
  }
}

const productSuscription = server$(async () => {
    try {
      const subscription = await Database.getinstance().product.subscribe({
       update:{
        after:{
          stock:{
            gt:30
          }
        }
       }
      });
  
      for await (const product of subscription) {
         console.log(product);
      }
     
  
    } catch (error) {
      console.log(error);
    }
  })
  
  
  
  async function main() {
    await productSuscription();
    //await productStream();
  }
  main();
  