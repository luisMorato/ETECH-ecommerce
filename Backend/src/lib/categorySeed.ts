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
                            name: "SSD",
                        },
                        {
                            name: "HardDrive"
                        },
                        {
                            name: "RAMMemory"
                        },
                        {
                            name: "VideoCard"
                        },
                        {
                            name: "MotherBoard"
                        },
                        {
                            name: "Processors"
                        },
                        {
                            name: "PowerSupply"
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
                            name: "Keyboard",
                        },
                        {
                            name: "HeadSets"
                        },
                        {
                            name: "Mouse"
                        },
                        {
                            name: "SoundBox"
                        },
                        {
                            name: "Printers"
                        },
                        {
                            name: "Cabinets"
                        },
                        {
                            name: "CablesAndAdapters"
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
                            name: "GamerComputer",
                        },
                        {
                            name: "ComputerWorkstation"
                        },
                        {
                            name: "HouseAndOfficeComputer"
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
                            name: "NoteBooks",
                        },
                        {
                            name: "NotebookGamer"
                        },
                        {
                            name: "ChargesAndSources"
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
                            name: "GamerMonitors",
                        },
                        {
                            name: "HomeAndOfficeMonitor"
                        },
                        {
                            name: "MonitorAndTVSupport"
                        },
                        {
                            name: "MonitorAccessories"
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