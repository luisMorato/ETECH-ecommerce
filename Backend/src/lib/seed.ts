import { db } from "./db/db"

const seed = async () => {
    //Products
    const product1 = await db?.product.create({
        data: {
            name: "Monitor Gamer KBM! GAMING MG330 31.5' Led, Curvo",
            image: ["prod1_01.jpg", "prod1_02.jpg", "prod1_03.jpg", "prod1_04.jpg"],
            desc: [
                "O Monitor Gamer KBM! GAMING MG330 conta com resposta de 1ms e taxa de atualização de 165Hz, permitindo a mais alta performance durante suas gameplays. Sua curvatura amplia o campo de visão relativo, concentrando toda a ação ao alcance dos olhos do usuário, sem perder resolução.", 
                "Melhor Entrega de Imagens para sua Gameplay Compatível com a tecnologia Adaptive Sync, permite a sincronização dos frames da placa de vídeo, decretando o fim do input lag, bem como do tearing.",
                "Conectividade O Monitor Gamer KBM! GAMING MG330 acompanha um cabo DisplayPort que garante a melhor qualidade de imagem para seu jogo. Além da conexão DP, o monitor ainda possui duas conexões HDMI e uma conexão P2 para ouvir seu jogo diretamente do seu monitor.",
                "Maior Ergonomia e Conforto para Uso Prolongado, O Monitor Gamer KBM! GAMING MG330 possui ajuste de inclinação de 5° a 15° que se ajusta ergonomicamente para o seu uso. O monitor também conta com Redução de Luz Azul, se tornando uma ótima opção para Gameplays prolongadas."
            ],
            price: 1099.99,
            stock: 20,
            categoryId: 5,
            subCategoryId: 21
        }
    });

    const product2 = await db?.product.create({
        data: {
            name: "Processador AMD Ryzen 7 5700X3D, 3.6 GHz, (4.1GHz Max Turbo), Cachê 4MB, 8 Núcleos",
            image: ["prod2_01.jpg", "prod2_02.jpg", "prod2_03.jpg", "prod2_04.jpg"],
            desc: [
                "Processador AMD Ryzen 7 5700X3D Arquitetura Zen 3 Refinada Desfrute de velocidades supersônicas com 8 núcleos e 16 threads de processamento, prontos para enfrentar os títulos mais desafiadores.", 
                "Frequência base de 3,0GHz e boost dinâmico de até 4,1GHz para eliminar qualquer engasgo. Eficiência Energética sem Abdicar da PotênciaJogue por horas sem se preocupar.",
                "O TDP de 105W garante alto desempenho sem consumo excessivo de energia."
            ],
            price: 1298.99,
            stock: 10,
            categoryId: 5,
            subCategoryId: 6
        }
    });

    const product3 = await db?.product.create({
        data: {
            name: "Headset Gamer Sem Fio Redragon Zeus Pro, 7.1",
            image: ["prod3_01.jpg", "prod3_02.jpg", "prod3_03.jpg", "prod3_04.jpg"],
            desc: [
                "Headset Gamer Sem Fio Redragon Zeus Pro. O headset gamer Redragon Zeus Pro é a escolha perfeita para quem busca um produto de qualidade, com excelente desempenho e conforto.",
                "Com um design moderno e ergonômico, ele proporciona horas de diversão sem cansaço. O Zeus Pro possui drivers de 53mm, que oferecem uma qualidade sonora imersiva, com graves profundos e agudos cristalinos.",
                "O sistema de som surround 7.1 virtual proporciona uma experiência ainda mais realista, permitindo que você se sinta no centro da ação."
            ],
            price: 329.99,
            stock: 30,
            categoryId: 2,
            subCategoryId: 9
        }
    });

    const product4 = await db?.product.create({
        data: {
            name: "SSD 1 TB Kingston NV2, M.2 2280 PCIe, NVMe",
            image: ["prod4_01.jpg", "prod4_02.jpg", "prod4_03.jpg", "prod4_04.jpg"],
            desc: [
                "O NV2 PCIe 4.0 NVMe SSD da Kingston é uma solução substancial de armazenamento de última geração alimentada por um controlador Gen 4x4 NVMe.",
                "O NV2 oferece velocidades de leitura/gravação de até 3.500/2.100 MB/s com menores requisitos de energia e menor aquecimento para ajudar a otimizar o desempenho do seu sistema e agregar valor sem sacrifícios.",
                "O design compacto de face única M.2 2280 (22x80mm) expande o armazenamento em até 2TB** enquanto economiza espaço para outros componentes, tornando o NV2 ideal para notebooks mais finos, sistemas de formato pequeno (SFF) e placas-mãe DIY.",
                "Instalar um SSD (Disco de estado sólido) M.2 é fácil e aumentará significativamente o desempenho do seu computador. Siga esses passos abaixo para acelerar seu dispositivo e aumentar o espaço livre de armazenamento.",
                "Disponível em capacidades de 1 TB para oferecer todo o espaço necessário para aplicativos, documentos, fotos, vídeos e muito mais."
            ],
            price: 389.99,
            stock: 27,
            categoryId: 1,
            subCategoryId: 1
        }
    });

    const product5 = await db?.product.create({
        data: {
            name: "Caixa De Som 2.0 Multilaser Sp093",
            image: ["prod5_01.jpg", "prod5_02.jpg", "prod5_03.jpg", "prod5_04.jpg"],
            desc: [
                "Leve mais qualidade de som para a sua casa! Discretas e compactas, as Caixas de Som Multilaser SP093 combinam perfeitamente com o seu computador.",
                "Possuem conexão USB, potência de 1W RMS e visual diferenciado.",
                "Oferece fácil conexão com notebook, ultrabook ou PC, além de ocupar pouco espaço em mesas ou áreas de trabalho."
            ],
            price: 39.90,
            stock: 50,
            categoryId: 2,
            subCategoryId: 11
        }
    });

    const product6 = await db?.product.create({
        data: {
            name: "Teclado Multi Slim ABNT2, Preto ",
            image: ["prod6_01.jpg", "prod6_02.jpg", "prod6_03.jpg"],
            desc: [
                "Este teclado é ideal para proporcionar alta qualidade, praticidade e simplicidade ao seu dia-a-dia.",
                "Com tecnologia de conexão Plug e Play, conecte a entrada USB e comece a usar. O teclado possui resistência a água, além de design compacto para ocupar menos espaço."
            ],
            price: 22.90,
            stock: 40,
            categoryId: 2,
            subCategoryId: 8
        }
    });

    const product7 = await db?.product.create({
        data: {
            name: "Mouse com fio USB Logitech M90",
            image: ["prod7_01.jpg", "prod7_02.jpg", "prod7_03.jpg", "prod7_04.jpg"],
            desc: [
                "Mouse com fio USB Logitech M90 com Design Ambidestro e Facilidade Plug and Play O M90 fornece o necessário para seu conforto e controle confiável de seu computador.",
                "esenvolvido pela Logitech, a marca especialista em mouses, apresentando a qualidade de quem já produziu mais de um bilhão de mouses.",
                "Não é necessário instalar nenhum software.",
                "Conectividade USB e Design Ambidestro.",
                "O Mouse com fio USB Logitech M90 tem conexão por fio, basta conectá-lo a uma porta USB e usá-lo imediatamente.",
                "Projetado para manter ambas as mãos. E então, você vai se sentir confortável, mesmo após horas de uso."
            ],
            price: 28.90,
            stock: 50,
            categoryId: 2,
            subCategoryId: 10
        }
    });

    const product8 = await db?.product.create({
        data: {
            name: "Impressora Multifuncional Epson EcoTank L3250",
            image: ["prod8_01.jpg", "prod8_02.jpg", "prod8_03.jpg", "prod8_04.jpg"],
            desc: [
                "Impressora Multifuncional Epson EcoTank L3250 A Epson EcoTank L3250 é uma multifuncional tanque de tinta 3 em 1 com conexão wireless destinada à famílias, estudantes, e profissionais.",
                "Oferece baixo custo de impressão graças ao sistema de EcoTank, que imprime até 4.500 páginas em preto e 7.500 páginas coloridas¹ com cada kit de garrafas de reposição original.",
                "A tecnologia Heat-Free da Epson não requer aquecimento da tinta no processo, e com isso garante mais rapidez, economia de energia e confiabilidade à impressora. Além disso, a Epson L3250 garante uma experiência de abastecimento simples, sem sujeira e sem desperdícios através da tecnologia EcoFit e os tanques frontais permitem fácil acesso e visualização dos níveis de tinta.",
                "Projetada para integrar um estilo de vida inteligente, possui conectividade avançada com recursos Wi-Fi, Wi-Fi Direct3, e impressão a partir de dispositivos móveis através do novo aplicativo Epson Smart Panel.",
                "Seu design compacto permite encaixar a multifuncional nos menores espaços.", 
                ""
            ],
            price: 1059.99,
            stock: 30,
            categoryId: 2,
            subCategoryId: 12
        }
    });
    
    const product9 = await db?.product.create({
        data: {
            name: "Fonte XPG Kyber, 750W, 80 Plus Gold, Com Cabo",
            image: ["prod9_01.jpg", "prod9_02.jpg", "prod9_03.jpg", "prod9_04.jpg"],
            desc: [
                "As unidades de fonte de alimentação KYBER aderem às especificações do guia de design Intel ATX 3.0 e oferecem um conector 12VHPWR na categoria de 750 e 850 watts.",
                "A KYBER pode suportar as placas gráficas mais recentes, e é feita especificamente para aqueles que exigem alta capacidade gráfica e desempenho.",
                "A SÉRIE XPG KYBER é certificada pela Cybenetics por sua eficiência e nível de ruído, ficando no topo de sua categoria nos padrões ETA e LAMBDA.  Para obter mais informações, visite Cybenetics Labs – Certificações de eficiência e nível de ruído XPG PSU.",
                "As unidades de fonte de alimentação da série KYBER são certificadas GOLD pela 80 PLUS, alcançando até 91,40% (115V) de eficiência com 50% de carga.",
                "A curva de ventoinha inteligente garante uma operação silenciosa na maioria dos cenários do usuário. Ao iniciar o controle da ventoinha em baixas RPM, faz menos ruído e alcança uma vida útil muito mais longa para a ventoinha e para o PSU em geral."
            ],
            price: 499.99,
            stock: 20,
            categoryId: 1,
            subCategoryId: 7
        }
    });

    const product10 = await db?.product.create({
        data: {
            name: "Placa Mãe MSI B560M PRO-E, Intel LGA 1200, mATX, DDR4",
            image: ["prod10_01.jpg", "prod10_02.jpg", "prod10_03.jpg", "prod10_04.jpg"],
            desc: [
                "A série PRO ajuda os usuários a trabalhar de forma mais inteligente, oferecendo uma experiência eficiente e produtiva.",
                "Com funcionalidade estável e montagem de alta qualidade, as placas-mãe da série PRO oferecem não apenas fluxos de trabalho profissionais otimizados, mas também menos resolução de problemas e longevidade.",
                "MSI Lightning Gen 4 PCI-E é a solução de transferência de dados PCI-E mais recente e mais rápida com 64 GB/s de largura de banda de transferência que dobrou em comparação com sua geração anterior.",
                "O PCIe 4.0 mantém a compatibilidade com versões anteriores e posteriores com especificações mais antigas e mais recentes.",
                "Otimizadas pelo design de armadura de aço, suas placas-mãe podem suportar o peso de placas gráficas pesadas."
            ],
            price: 439.99,
            stock: 15,
            categoryId: 1,
            subCategoryId: 5
        }
    });

    const product11 = await db?.product.create({
        data: {
            name: "Placa Mãe ASRock B450M-HDV R4.0, AMD AM4, Micro ATX, DDR4",
            image: ["prod11_01.jpg", "prod11_02.jpg", "prod11_03.jpg", "prod11_04.jpg"],
            desc: [
                "Placa Mãe ASRock B450M-HDV R4.0",
                "AMD AM4",
                "Micro ATX",
                "DDR4"
            ],
            price: 359.99,
            stock: 15,
            categoryId: 1,
            subCategoryId: 9
        }
    });

    const product12 = await db?.product.create({
        data: {
            name: "Placa de Vídeo RX 6600 V2 ASUS Dual AMD Radeon, 8GB GDDR6 ",
            image: ["prod12_01.jpg", "prod12_02.jpg", "prod12_03.jpg", "prod12_04.jpg"],
            desc: [
                "Oferecendo a mais recente experiência de arquitetura AMD RDNA 2 na sua forma mais pura, o ASUS Dual Radeon RX 6600 V2 combina desempenho e simplicidade como nenhum outro. Aproveitando tecnologias de refrigeração avançadas derivadas de placas gráficas emblemáticas, a escolha perfeita para uma construção bem equilibrada.",
                "As novas placas graficas AMD Radeon RX 6950 XT, RX 6750 XT e RX 6650 XT são otimizadas para DirectStorage para ajudar a reduzir o tempo de carregamento em jogos e dar vida a mundos expansivos com detalhes incriveis.",
                "As placas graficas Radeon RX Série 6000 aproveitam ao maximo as mais recentes inovacoes em tecnologias de upscaling, como AMD FidelityFX Super Resolution2 ou a nova Radeon Super Resolution.",
            ],
            price: 1269.99,
            stock: 35,
            categoryId: 1,
            subCategoryId: 4
        }
    });

    const product13 = await db?.product.create({
        data: {
            name: "Gabinete Gamer Rise Mode Glass 06X, Mid Tower",
            image: ["prod13_01.jpg", "prod13_02.jpg", "prod13_03.jpg", "prod13_04.jpg"],
            desc: [
                "Os Gabinetes são a estrutura que une toda sua build, onde você vai querer algo que tenha flexibilidade para montagem da suas peças, garanta boa refrigeração dos componentes e que deixe tudo bonito.",
                "O Gabinete Rise Mode Glass 06X é a melhor escolha para tudo isso. Com acabamento externo em Vidro, dand um toque de estilo ao seu setup. Além de possuir espaço para 6 Fans (que não acompanham o gabinete).",
                "Com toda a sua parte interna na cor preta, o Gabinete Rise Mode Glass 06X Preto é a sua escolha perfeita para um setup organizado e muito cheio de estilo.",
                "O Gabinete Rise Mode é compatível com placas mãe padrão ATX / M-ATX / ITX, dando a você a possibilidade um PC Monstro. ",
                "Comporta até 06 fans (não inclusas) para deixar o fluxo de ar perfeito dentro do gabinete e, com uma lateral de vidro cristalina, ainda permite que você admire o interior da sua obra."
            ],
            price: 158.90,
            stock: 65,
            categoryId: 2,
            subCategoryId: 13
        }
    });
    const product14 = await db?.product.create({
        data: {
            name: "Processador Intel Core i9-12900KF, 3.2GHz ",
            image: ["prod14_01.jpg", "prod14_02.jpg"],
            desc: [
                "Projetado para os jogos da próxima geração. ",
                "Desempenho revolucionário e capacidade para multitarefas com as mais elevadas velocidades do clock e uma nova arquitetura revolucionária.",
                "ocê poderá impulsionar sua jogabilidade para novos patamares, enquanto os aplicativos secundários são executados com perfeição em segundo plano.",
                "Até 5,2GHz velocidade máxima do clock com 16 núcleos e 24 threads.",
            ],
            price: 2348.99,
            stock: 25,
            categoryId: 1,
            subCategoryId: 6
        }
    });

    const product15 = await db?.product.create({
        data: {
            name: "HD Seagate 4TB BarraCuda, 3.5', SATA - ST4000DM004 ",
            image: ["prod15_01.jpg", "prod15_02.jpg", "prod15_03.jpg"],
            desc: [
                "Versátil, Rápido e Confiável",
                "Os discos rígidos BarraCuda da Seagate são perfeitos para armazenamento de notebooks, armazenamento de dispositivos móveis, armazenamento tudo em um e muito mais.",
                "O HD Seagate BarraCuda de 3,5 polegadas oferecem excelência líder de mercado em computação pessoal, com 4 TB de capacidade dando mais capacidade de armazenamento.",
                "Construa um futuro sem atrito para seus dados com o líder mundial em armazenamento.",
            ],
            price: 599.99,
            stock: 35,
            categoryId: 1,
            subCategoryId: 2
        }
    });

    const product16 = await db?.product.create({
        data: {
            name: "HD Externo Seagate Expansion, 4TB, USB, Preto",
            image: ["prod16_01.jpg", "prod16_02.jpg", "prod16_03.jpg", "prod16_04.jpg"],
            desc: [
                "Disco Seagate Expansion para desktop armazenamento extra para o seu PC e Mac. A unidade portátil Seagate Expansion é compacta e perfeita para viagens.",
                "A configuração é simples e direta; simplesmente conecte um único cabo USB e você estará pronto para começar. A unidade é alimentada pelo cabo USB, portanto, não há necessidade de uma fonte de alimentação externa.",
                "Além disso, ele é reconhecido automaticamente pelo sistema operacional Windows ou Mac, portanto, não há software para instalar e nada para configurar.",
                "Salvar arquivos é fácil - simplesmente arrastar e soltar.",
                "Aproveite as vantagens das velocidades rápidas de transferência de dados com a interface USB 3.0 conectando-se a uma porta USB 3.0. Além disso, o Seagate Expansion vem com Rescue Data Recovery Services para maior tranquilidade.",
            ],
            price: 699.99,
            stock: 45,
            categoryId: 1,
            subCategoryId: 2
        }
    });

    const product17 = await db?.product.create({
        data: {
            name: "Adaptador Hdmi M/vga F Sem Áudio",
            image: ["prod17_01.jpg", "prod17_02.jpg", "prod17_03.jpg", "prod17_04.jpg"],
            desc: [
                "Suporta resolução até 1080p, sem áudio - Instalação plug and play",
                "Não possui função áudio, converte apenas vídeo",
                "Conector VGA fêmea p/ HDMI macho",
            ],
            price: 23.16,
            stock: 85,
            categoryId: 2,
            subCategoryId: 14
        }
    });

    const product18 = await db?.product.create({
        data: {
            name: "HUB USB KABUM! essentials AS200, 4 Portas",
            image: ["prod18_01.jpg", "prod18_02.jpg", "prod18_03.jpg"],
            desc: [
                "O HUB USB AS200 é um dispositivo compacto que permite conectar até 4 dispositivos USB ao seu computador ou notebook.",
                "Portas USB 3.0, para altas velocidades de transferência de dados e grandes arquivos rapidamente.",
                "Para notebooks e desktops que possuem número de portas limitado, o HUB USB é a solução perfeita para expandir as possibilidades de conexão.",
                "Além disso, pode funcionar como um extensor das portas USB caso fiquem em local pouco acessível do gabinete.",
            ],
            price: 33.99,
            stock: 65,
            categoryId: 2,
            subCategoryId: 14
        }
    });

    const product19 = await db?.product.create({
        data: {
            name: "Cabo Hdmi 2.0 4k 1,5 Metros",
            image: ["prod19_01.jpg", "prod19_02.jpg", "prod19_03.jpg"],
            desc: [
                "Conector: HDMI macho x HDMI macho",
                "Revestimento: PVC - Tipo: Cabo HDMI para HDMI",
                "Comprimento: 1,5 metros",
            ],
            price: 8.49,
            stock: 95,
            categoryId: 2,
            subCategoryId: 14
        }
    });

    const product20 = await db?.product.create({
        data: {
            name: "Adaptador DVI-D M X VGA F MD9, 24+1, Dual Link",
            image: ["prod20_01.jpg"],
            desc: [
                "Conexão: DVI-D (Macho) x VGA (Fêmea)",
                "Pinagem: 24+1- Dual Link"
            ],
            price: 15.99,
            stock: 44,
            categoryId: 2,
            subCategoryId: 14
        }
    });

    // const product21 = await db?.product.create({
    //     data: {
    //         name: "Adaptador DVI-D M X VGA F MD9, 24+1, Dual Link",
    //         image: ["prod20_01.jpg"],
    //         desc: [
    //             "Conexão: DVI-D (Macho) x VGA (Fêmea)",
    //             "Pinagem: 24+1- Dual Link"
    //         ],
    //         price: 15.99,
    //         stock: 44,
    //         categories: "peripherals",
    //         subcategory: "cablesandadapters"
    //     }
    // });

    // const product22 = await db?.product.create({
    //     data: {
    //         name: "Adaptador DVI-D M X VGA F MD9, 24+1, Dual Link",
    //         image: ["prod20_01.jpg"],
    //         desc: [
    //             "Conexão: DVI-D (Macho) x VGA (Fêmea)",
    //             "Pinagem: 24+1- Dual Link"
    //         ],
    //         price: 15.99,
    //         stock: 44,
    //         categories: "peripherals",
    //         subcategory: "cablesandadapters"
    //     }
    // });

    // const product23 = await db?.product.create({
    //     data: {
    //         name: "Adaptador DVI-D M X VGA F MD9, 24+1, Dual Link",
    //         image: ["prod20_01.jpg"],
    //         desc: [
    //             "Conexão: DVI-D (Macho) x VGA (Fêmea)",
    //             "Pinagem: 24+1- Dual Link"
    //         ],
    //         price: 15.99,
    //         stock: 44,
    //         categories: "peripherals",
    //         subcategory: "cablesandadapters"
    //     }
    // });
};

seed().then(async () => {
    console.log('Database Seeded');
    db?.$disconnect();
}).catch(async (error) => {
    console.error(`Error Seeding: ${error}`);
    db?.$disconnect();
    process.exit(1)
})