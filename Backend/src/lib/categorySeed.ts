import { db } from "./db/db"

const seed = async () => {
    //Categories
    const hardware = await db?.productCategory.create({
        data: {
            name: "hardware",
            subCategories: {
                createMany: {
                    data: [
                        {
                            name: "ssd",
                        },
                        {
                            name: "harddrive"
                        },
                        {
                            name: "rammemory"
                        },
                        {
                            name: "videocard"
                        },
                        {
                            name: "motherboards"
                        },
                        {
                            name: "processors"
                        },
                        {
                            name: "powersupply"
                        },
                    ],
                    skipDuplicates: true,
                }
            }
        },
    });

    const peripherals = await db?.productCategory.create({
        data: {
            name: "peripherals",
            subCategories: {
                createMany: {
                    data: [
                        {
                            name: "keyboard",
                        },
                        {
                            name: "headSets"
                        },
                        {
                            name: "mouse"
                        },
                        {
                            name: "soundbox"
                        },
                        {
                            name: "printers"
                        },
                        {
                            name: "cabinets"
                        },
                        {
                            name: "cablesandadapters"
                        },
                    ],
                    skipDuplicates: true,
                }
            }
        },
    });

    const computers = await db?.productCategory.create({
        data: {
            name: "computers",
            subCategories: {
                createMany: {
                    data: [
                        {
                            name: "gamercomputer",
                        },
                        {
                            name: "computerworkstation"
                        },
                        {
                            name: "houseandofficecomputer"
                        },
                    ],
                    skipDuplicates: true,
                }
            }
        },
    });

    const notebooks = await db?.productCategory.create({
        data: {
            name: "notebooks",
            subCategories: {
                createMany: {
                    data: [
                        {
                            name: "noteBooks",
                        },
                        {
                            name: "notebookgamer"
                        },
                        {
                            name: "chargesandsources"
                        },
                    ],
                    skipDuplicates: true,
                }
            }
        },
    });

    const monitors = await db?.productCategory.create({
        data: {
            name: "monitors",
            subCategories: {
                createMany: {
                    data: [
                        {
                            name: "gamermonitors",
                        },
                        {
                            name: "homeandofficemonitor"
                        },
                        {
                            name: "monitorandtvsupport"
                        },
                        {
                            name: "monitoraccessories"
                        },
                    ],
                    skipDuplicates: true,
                }
            }
        },
    });
}


seed().then(async () => {
    console.log('Database Seeded');
    db?.$disconnect();
}).catch(async (error) => {
    console.error(`Error Seeding: ${error}`);
    db?.$disconnect();
    process.exit(1)
})