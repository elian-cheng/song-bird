!(function () {
  "use strict";
  const modules_flsModules = {};
  let bodyLockStatus = !0,
    bodyUnlock = (delay = 500) => {
      let body = document.querySelector("body");
      if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let index = 0; index < lock_padding.length; index++) {
            lock_padding[index].style.paddingRight = "0px";
          }
          (body.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, delay),
          (bodyLockStatus = !1),
          setTimeout(function () {
            bodyLockStatus = !0;
          }, delay);
      }
    },
    bodyLock = (delay = 500) => {
      let body = document.querySelector("body");
      if (bodyLockStatus) {
        let lock_padding = document.querySelectorAll("[data-lp]");
        for (let index = 0; index < lock_padding.length; index++) {
          lock_padding[index].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (body.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (bodyLockStatus = !1),
          setTimeout(function () {
            bodyLockStatus = !0;
          }, delay);
      }
    };
  let formValidate = {
    getErrors(form) {
      let error = 0,
        formRequiredItems = form.querySelectorAll("*[data-required]");
      return (
        formRequiredItems.length &&
          formRequiredItems.forEach(formRequiredItem => {
            (null === formRequiredItem.offsetParent &&
              "SELECT" !== formRequiredItem.tagName) ||
              formRequiredItem.disabled ||
              (error += this.validateInput(formRequiredItem));
          }),
        error
      );
    },
    validateInput(formRequiredItem) {
      let error = 0;
      return (
        "email" === formRequiredItem.dataset.required
          ? ((formRequiredItem.value = formRequiredItem.value.replace(" ", "")),
            this.emailTest(formRequiredItem)
              ? (this.addError(formRequiredItem), error++)
              : this.removeError(formRequiredItem))
          : ("checkbox" !== formRequiredItem.type ||
              formRequiredItem.checked) &&
            formRequiredItem.value.trim()
          ? this.removeError(formRequiredItem)
          : (this.addError(formRequiredItem), error++),
        error
      );
    },
    addError(formRequiredItem) {
      formRequiredItem.classList.add("_form-error"),
        formRequiredItem.parentElement.classList.add("_form-error");
      let inputError =
        formRequiredItem.parentElement.querySelector(".form__error");
      inputError && formRequiredItem.parentElement.removeChild(inputError),
        formRequiredItem.dataset.error &&
          formRequiredItem.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${formRequiredItem.dataset.error}</div>`
          );
    },
    removeError(formRequiredItem) {
      formRequiredItem.classList.remove("_form-error"),
        formRequiredItem.parentElement.classList.remove("_form-error"),
        formRequiredItem.parentElement.querySelector(".form__error") &&
          formRequiredItem.parentElement.removeChild(
            formRequiredItem.parentElement.querySelector(".form__error")
          );
    },
    formClean(form) {
      form.reset(),
        setTimeout(() => {
          let inputs = form.querySelectorAll("input,textarea");
          for (let index = 0; index < inputs.length; index++) {
            const el = inputs[index];
            el.parentElement.classList.remove("_form-focus"),
              el.classList.remove("_form-focus"),
              formValidate.removeError(el);
          }
          let checkboxes = form.querySelectorAll(".checkbox__input");
          if (checkboxes.length > 0)
            for (let index = 0; index < checkboxes.length; index++) {
              checkboxes[index].checked = !1;
            }
          if (modules_flsModules.select) {
            let selects = form.querySelectorAll(".select");
            if (selects.length)
              for (let index = 0; index < selects.length; index++) {
                const select = selects[index].querySelector("select");
                modules_flsModules.select.selectBuild(select);
              }
          }
        }, 0);
    },
    emailTest(formRequiredItem) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
        formRequiredItem.value
      );
    },
  };
  var birds = [
    [
      {
        id: 1,
        name: "Ворон",
        species: "Corvus corax",
        description:
          "Ворон – крупная птица. Длина тела достигает 70 сантиметров, размах крыльев – до полутора метров. Вороны населяют окрестности Тауэра. В Англии бытует поверье, что в день, когда черные вороны улетят от Тауэра, монархия рухнет.",
        image:
          "https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/XIQVMQVUPP/XC518684-Grands%20corbeaux%2009012020%20Suzon.mp3",
      },
      {
        id: 2,
        name: "Журавль",
        species: "Grus grus",
        description:
          "Звуки, издаваемые журавлем, похожи на звонкое «кур-лы – кур-лы». Журавли чаще всего поют дуэтом – одна птица начинает запев со слога «кур», а вторая подхватывает «лы». Если птица поёт одна, то она издает только звук «кур».",
        image: "https://live.staticflickr.com/65535/49221158846_b0b69a58f1.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/BLMSIUFTFU/XC512582-190604_1087_Grus_tok.mp3",
      },
      {
        id: 3,
        name: "Ласточка",
        species: "Delichon urbicum",
        description:
          "Для ласточек характерно негромкое щебетание. Песни ласточек не смолкают на протяжении всего лета. Исследователи различают у птиц до 6 щебечущих звуков: «вит», «ви-вит», «чивит», «чиривит» и т.п. Ласточки любят петь дуэтом.",
        image:
          "https://live.staticflickr.com//65535//48539007512_5029d2a9a0.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC489247-190724_09.10h_huiszwaluw_biesbosch_amaliahoeve_roep_100%2Bex_fouragerend_gezien_%20%282%29.mp3",
      },
      {
        id: 4,
        name: "Козодой",
        species: "Caprimulgus europaeus",
        description:
          "Козодой – неприметная птица, известная благодаря своему голосу. Песня козодоя звучит как монотонная трель похожая на тарахтение мотоцикла. Такое дребезжание слышно от заката до рассвета, его тональность, частота и громкость изменяются. ",
        image: "https://live.staticflickr.com/65535/48456345286_dbc8530027.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC486956-190623_22.37h_nachtzwaluw_rechte%20heide_zang_ad%20_2ex_gezien_.mp3",
      },
      {
        id: 5,
        name: "Кукушка",
        species: "Cuculus canorus",
        description:
          "Кукушку назвали так из-за особенностей ее песен. Звонкое «ку-ку» не спутать ни с какой другой птицей. Кукушки не строят гнезда, их потомство выращивают другие виды пернатых, которым кукушки подбрасывают свои яйца.",
        image: "https://live.staticflickr.com/65535/48377838151_e15f430ec1.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC501461-190616_08.13h_koekoek_brabantse%20biesbosch%20jantjesplaat_roep_1%20ex_ad%20m_ter%20plaatse%20zingend_gezien_.mp3",
      },
      {
        id: 6,
        name: "Синица",
        species: "Parus major",
        description:
          "В щебетании синиц различают более 40 различных звуковых сочетаний. Поют они практически круглый год, немного затихая только зимой. Синицы настоящие санитары леса. Одна пара синиц в период гнездования оберегает от вредителей десятки деревьев.",
        image:
          "https://live.staticflickr.com/65535/52474688186_55c01dc093_h.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/RFGQDPLDEC/XC518417-Kj%C3%B8ttmeis%20XC%20Helg%C3%B8ya%20Elias%20A.%20Ryberg20200108133922_079.mp3",
      },
    ],
    [
      {
        id: 1,
        name: "Воробей",
        species: "Passer domesticus",
        description:
          "Воробьи являются самыми известными и узнаваемыми пернатыми. Их легко узнать по пестрому оперению и задорному чириканью. Воробьи относятся к синатропному виду — они селятся поблизости к человеческому жилищу.",
        image:
          "https://live.staticflickr.com//65535//49366595303_06cf65b07e.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/CXFHOPIVAS/XC503224-191020_0134.mp3",
      },
      {
        id: 2,
        name: "Грач",
        species: "Corvus frugilegus",
        description:
          "Грачи очень умные и сообразительные птицы. С помощью клюва они создают и используют простейшие орудия. У грачей развит рефлекс на звуки трактора. Услышав «тарахтение», они летят на звук – трактор пашет землю, значит, в этом месте много корма.",
        image:
          "https://live.staticflickr.com//65535//49347123322_291c86b016.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/RLRHCUIPIY/XC512540-gawron%20Suble%2019.12.19%20%2012.35.mp3",
      },
      {
        id: 3,
        name: "Галка",
        species: "Coloeus monedula",
        description:
          "Слово «галка» произошло из старославянского языка и переводится как «чёрный». Этим словом часто называют воронов или других черных птиц. Латинское название галки «monedula» связывают со словами монета за любовь птицы к блестящим и ярким вещам.",
        image:
          "https://live.staticflickr.com//65535//49237149586_993cf685c5.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC510498-Coloeus%20monedula_2019.11.13_11.55_01.mp3",
      },
      {
        id: 4,
        name: "Певчий дрозд",
        species: "Turdus philomelos",
        description:
          "Дрозд — лучший певец из отряда воробьиных. Песня состоит только из красивых звучных свистов и коротких трелей. Чаще всего её можно услышать в утреннее и вечернее время. Поют дрозды в течении всего периода гнездования.",
        image: "https://live.staticflickr.com/65535/48979125763_e2534f54bd.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/BLMSIUFTFU/XC513326-190704_1146_TF-Glogow.mp3",
      },
      {
        id: 5,
        name: "Сорока",
        species: "Pica pica",
        description:
          "Сорока очень трудолюбивая птица. Она строит до восьми гнёзд, а потом выбирает из них самое лучшее. Вход в гнездо сорок всегда обращен на юг, чтобы в жилище было теплее. Сороки являются единственными птицами, которые узнают себя в зеркале.",
        image:
          "https://live.staticflickr.com//65535//49360363066_ff02bb6a73.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC500868-Pica%20pica2019.08.23_09.18_02.mp3",
      },
      {
        id: 6,
        name: "Сойка",
        species: "Garrulus glandarius",
        description:
          "Когда сойка волнуется, хохолок на её голове взъерошивается. Птица старается создать устрашающее зрелище. Сойки умеют имитировать голоса других птиц, животных и звуки, которые создает человек. На зиму они делают большие запасы желудей и орехов.",
        image:
          "https://live.staticflickr.com//65535//49369678956_9a7465c7f4.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/TFOGOENSTQ/XC501517-191008_1590%201300.%20Eichelh%C3%A4her%20D%2C%20NW%2C%20LEV.%20Stephan%20Risch.mp3",
      },
    ],
    [
      {
        id: 1,
        name: "Зяблик",
        species: "Fringilla coelebs",
        description:
          "В дикой природе насчитывается 450 видов зябликов. Зимой зяблики ведут стайный образ жизни. Иногда в их семьях можно увидеть воробьев. Запевают зяблики весной, с наступлением брачного периода. Их пение – это заливистые многоминутные рулады.",
        image: "https://live.staticflickr.com/65535/49143150817_2d3a2f6c1e.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC512407-150622_03%20zi%C4%99ba%20%282%29.mp3",
      },
      {
        id: 2,
        name: "Клёст",
        species: "Loxia curvirostra",
        description:
          "Клестов называют «рождественскими» птицами. В естественных условиях они дают потомство зимой – в январе. Эти птицы утепляют свои гнезда мхом и шерстью животных, потому птенцам не холодно. В поисках шишек клесты могут улетать за 3500 км от гнезда.",
        image:
          "https://live.staticflickr.com//65535//49365470123_f2de66bb35.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/OTVUCEGYZN/XC495381-Kruisbek%20roep%20NHD%20290619.mp3",
      },
      {
        id: 3,
        name: "Горлица",
        species: "Streptopelia turtur",
        description:
          "Горлица обитает в смешанных и широколиственных лесах, а также в городских парках и поселках. Птицы часто выбирают места жизни рядом с человеком и легко привыкают к людям. Благодаря мелодичному приятному пению горлиц часто разводят в домашних условиях.",
        image: "https://live.staticflickr.com/65535/48063004977_84252f9ceb.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC324106-Turkawka_Streptopelia_turtur_Poland_Jarek_Matusiak_2011625_07.mp3",
      },
      {
        id: 4,
        name: "Дятел",
        species: "Dendrocopos major",
        description:
          "Дятел – заметная и шумная птица, часто живет рядом с человеком. С середины января до конца июня можно услышать «барабанную дробь» дятлов – трель от вибрации веток под быстрыми ударами клюва птицы. В хорошую погоду дробь слышна в радиусе 1,5 км.",
        image: "https://live.staticflickr.com/65535/49339376578_e933426455.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC518928-AB-017%20dzi%C4%99cio%C5%82%20du%C5%BCy%20agresja%20%282%29.mp3",
      },
      {
        id: 5,
        name: "Удод",
        species: "Upupa epops",
        description:
          "Удоды предпочитают жить на открытых ландшафтах с отдельными деревьями или рощами. Наиболее удобными для птицы являются лесостепь и саванна. Удод может выбирать места жительства рядом с человеком: пастбища, виноградники, фруктовые сады.",
        image:
          "https://live.staticflickr.com//65535//49226383598_6f8be86a06.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC477326-dudek%20%282%29.mp3",
      },
      {
        id: 6,
        name: "Стриж",
        species: "Apus apus",
        description:
          "Стрижа можно увидеть практически в каждом уголке планеты. Они обитают как в лесных зонах, так и на открытых местностях. Живут стрижи крупными стаями. Большие колонии этих птиц можно увидеть в городах или на прибрежных скалах.",
        image:
          "https://live.staticflickr.com//65535//48386150031_7b749df74b.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/TMUAWSDHDJ/XC511871-G.mp3",
      },
    ],
    [
      {
        id: 1,
        name: "Жаворонок",
        species: "Alauda arvensis",
        description:
          "Жаворонки — перелетные птицы. С начала сентября они отлетают на юг. Возвращаются они в начале марта, независимо от того, сошел снег или нет. По прилету жаворонков определяли наступление весны и пору, когда пора пахать землю.",
        image: "https://live.staticflickr.com/65535/47105096764_f751fba568.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC462158-Skowronek_Alauda_arvensis_Poland_Jarek_Matusiak_%20-006%20skowronek%20%282%29.mp3",
      },
      {
        id: 2,
        name: "Соловей",
        species: "Luscinia luscinia",
        description:
          "Соловьи поют с начала мая и до конца лета. Каждая песня соловья состоит из 12 повторяющихся элементов, которые еще называют коленами. Кроме собственных трелей, соловьи легко и хорошо перенимают пение других птиц.",
        image: "https://live.staticflickr.com/7605/27669397735_f3c21758f2.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/HILVWSADVL/XC513809-R07_0052%20Thrush%20Nightingale%20Snipe.mp3",
      },
      {
        id: 3,
        name: "Скворец",
        species: "Sturnus vulgaris",
        description:
          "Скворцы - перелётные птицы. Синхронный перелет больших стай скворцов называется мурмурацией. Это красивое и завораживающее явление – множество птиц будто танцуют в воздухе, образуя замысловатые фигуры, которые уменьшаются и увеличиваются в небе.",
        image: "https://live.staticflickr.com/65535/49357593971_9509fe1d7c.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC515519-2020.01.01_17.24_01.MP3",
      },
      {
        id: 4,
        name: "Иволга",
        species: "Oriolus oriolus",
        description:
          "Мелодичность голоса иволги сравнивают со звучанием флейты. Человеку сложно разглядеть иволгу, так как она обитает высоко на деревьях. Иволга не только очень красивая, но и  полезная птица. Она уничтожает ядовитых гусениц, которых не поедают другие птицы.",
        image: "https://live.staticflickr.com/65535/47102184004_58a93380b9.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC491801-2019.07.07_06.28_01.mp3",
      },
      {
        id: 5,
        name: "Свиристель",
        species: "Bombycilla garrulus",
        description:
          "У свиристели очень цепкие коготки, что помогает птице удерживаться на ветках и склевывать ягоды, которые труднее всего достать. В период ухаживаний самец предлагает самке ягоду или другое угощение. Если самка его принимает, то птицы создают пару.",
        image:
          "https://live.staticflickr.com//65535//49367433842_1b06da0e6b.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC517421-AB-004%20%282%29%20jemio%C5%82uszka.mp3",
      },
      {
        id: 6,
        name: "Щегол",
        species: "Carduelis carduelis",
        description:
          "Щеглы поют красиво и мелодично. И в природе, и в неволе они щебечут почти круглый год. В пении щегла различают более 20 переливчатых трелей. Щеглы привыкают к людям, и даже могут возвратиться к хозяину после того, как их выпустили на волю",
        image:
          "https://live.staticflickr.com//65535//49366257253_db3ce48b9a.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC489265-190724_07.58h_putter_biesbosch_%20boompjes%20langs%20open%20water_zang_1ex_ad_niet%20gezien_.mp3",
      },
    ],
    [
      {
        id: 1,
        name: "Орёл",
        species: "Aquila nipalensis",
        description:
          "В древние времена орел был символом солнца. Орлы часто парят над землей, при этом скорость их перемещения может достигать 240 км/ч. Иллюзия медленного движения происходит из-за высоты полета – более 700 метров",
        image:
          "https://live.staticflickr.com//4835//43867392960_7105d71e19.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/KTBTZAHSXF/10_Aquila_nipalensis_al02D85.mp3",
      },
      {
        id: 2,
        name: "Коршун",
        species: "Milvus migrans",
        description:
          "Коршуны – крупные хищники, в высоту они достигают около полуметра, а вес взрослых особей достигает 1 кг. Крылья узкие и длинные, их размах составляет 1,5 м. Коршуны часто гнездятся большими стаями и даже образуют крупные колонии.",
        image:
          "https://live.staticflickr.com//65535//48701190276_ee2a9ed594.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/SDPCHKOHRH/XC485740-2019-06-22%20Selenga%20Milan%20brun%20cris%20de%20quemandage%203.mp3",
      },
      {
        id: 3,
        name: "Лунь",
        species: "Circus cyaneus",
        description:
          "Лунь – это небольшой сокол. Питается в основном мышевидными грызунами, основа его рациона – полёвки, хомяки, мыши. Оперение луня может быть пепельно-серым. С такой птицей связано сравнение «седой, как лунь».",
        image: "https://live.staticflickr.com/4480/37240531151_b74619c99d.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/BLMSIUFTFU/XC513498-190709_1175_Cir.cyan-f.mp3",
      },
      {
        id: 4,
        name: "Сокол",
        species: "Falco peregrinus",
        description:
          "Латинское название сокола Falco произошло от слова «серп» из-за серповидной формы крыльев. Длинные и широкие крылья позволяют соколу высоко подниматься в небо и свободно парить. Скорость полёта сокола достигает 280-320 километров в час.",
        image:
          "https://live.staticflickr.com//65535//49310710607_92a3a145a9.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC496049-Pilgrimsfalk_06.mp3",
      },
      {
        id: 5,
        name: "Ястреб",
        species: "Accipiter gentilis",
        description:
          "Для всех ястребов характерны широкие и короткие крылья. Ещё один отличительный признак - белые «брови» над глазами. Славянские дружинники размещали изображение ястреба на своих знаменах, как символ отваги, мощи и безжалостности к врагам.",
        image:
          "https://live.staticflickr.com//65535//49024617331_b9d0d2c9b3.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3",
      },
      {
        id: 6,
        name: "Филин",
        species: "Bubo bubo",
        description:
          "Полет филина бесшумный, зрение очень острое. Эти особенности делают птицу непревзойденным ночным охотником. У филина нет естественных врагов, ни один зверь не охотится на взрослых птиц. А вот на птенцов нападают лисы и волки.",
        image: "https://live.staticflickr.com/65535/48137123012_393653c2e4.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/WNLIDKJKXT/XC518386-sense%20t%C3%ADtol.mp3",
      },
    ],
    [
      {
        id: 1,
        name: "Альбатрос",
        species: "Diomedea exulans",
        description:
          "Альбатрос - самая крупная летающая птица в мире. Размах крыльев достигает три с половиной, вес - десять килограммов. Большую часть жизни альбатросы проводят в воздухе, покрывая над океанскими просторами огромные расстояния",
        image: "https://live.staticflickr.com/7557/16260253965_8e9430cb66.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/WOEAFQRMUD/XC293087-Diomedea%20exulans151120_T254.mp3",
      },
      {
        id: 2,
        name: "Олуша",
        species: "Sula nebouxii",
        description:
          "Особенностью голубоногой олуши является не только насыщенный ярко-синий цвет лапок, но еще и тот факт, что они очень теплые. В то время как другие виды птиц греют кладки своим телом, голубоногая олуша делает это с помощью лапок",
        image: "https://live.staticflickr.com/800/40645471394_4422e69ed8.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/YHKQPPJDVP/XC411507-171217_1491%20BF%20Booby%205ft%20IDLP%201230%20mp3%20amp.mp3",
      },
      {
        id: 3,
        name: "Буревестник",
        species: "Puffinus griseus",
        description:
          "Размеры буревестниковых разные. Самые маленькие из них в длину составляют до 25 см, самые большие - до 1 м, при размахе крыльев около 2 м. Существует поверье, что появление буревестника в воздухе предвещает бурю, о чем говорит само название птицы.",
        image: "https://live.staticflickr.com//607//22136056020_935cb113f9.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/XQEVNREHJY/SHEARWATER%20Christmas%20Island_04_Motu_Isla%20de%20Pascua-Easter%20Island_CH_4MAR03_Alvaro%20Jaramillo.mp3",
      },
      {
        id: 4,
        name: "Пеликан",
        species: "Pelecanus",
        description:
          "Пеликаны — обитатели морей и рек. Ходят они неуклюже, но хорошо летают и плавают. Питаются в основном рыбой, устраивают коллективные охоты — выстроившись полукругом хлопают по воде крыльями и клювами и вытесняют напуганную рыбу на мелководье.",
        image: "https://live.staticflickr.com/3230/2859474923_06a28c008d_k.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/XAMHIHFTZG/XC331138-call1.mp3",
      },
      {
        id: 5,
        name: "Пингвин",
        species: "Aptenodytes forsteri",
        description:
          "Самец императорского пингвина достигает роста 130 см, его масса может приближаться к 50 кг. Из всех современных пингвинов этот вид – самый крупный. Питание пингвина состоит из рыбы, кальмаров и криля. Охотятся птицы в океане большими группами.",
        image: "https://live.staticflickr.com/5202/5252413926_8e013a3efd.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/OOECIWCSWV/XC449827-LS100829%20King%20Penguin%20call%20A.mp3",
      },
      {
        id: 6,
        name: "Чайка",
        species: "Larus argentatus",
        description:
          "Чайки населяют берега морей, озёр, рек, водохранилищ, болот, часто гнездятся на островах. С конца прошлого века чайки стали появляться в крупных городах, где устраивает гнёзда на крышах зданий. Все чайки ведут колониальный образ жизни.",
        image: "https://live.staticflickr.com/65535/48577115317_7034201dde.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC501190-190801_06.50h_zilvermeeuw_duinen%20van%20goeree_roep_2ex_overvliegend_gezien_.mp3",
      },
    ],
  ];
  var birds_en = [
    [
      {
        id: 1,
        name: "Raven",
        species: "Corvus corax",
        description:
          "A raven is a large bird. Their body length reaches 70 centimeters, wingspan - up to one and a half meters. Ravens inhabit the vicinity of the Tower. In England, it is believed that on the day when black crows fly away from the Tower, the monarchy will collapse.",
        image:
          "https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/XIQVMQVUPP/XC518684-Grands%20corbeaux%2009012020%20Suzon.mp3",
      },
      {
        id: 2,
        name: "Crane",
        species: "Grus grus",
        description:
          'The sounds made by a crane are like a resounding "coo-coo-coo-coo-coo-coo". Cranes most often sing a duet - one bird begins the chorus with the syllable "kur" and the other picks up the "ly". If a bird sings alone, it makes only the "kur" sound.',
        image: "https://live.staticflickr.com/65535/49221158846_b0b69a58f1.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/BLMSIUFTFU/XC512582-190604_1087_Grus_tok.mp3",
      },
      {
        id: 3,
        name: "Swallow",
        species: "Delichon urbicum",
        description:
          'Swallows are characterized by a soft chirp. Swallows\' songs are not silent during the whole summer. Researchers distinguish up to 6 twittering sounds in birds: "vith", "vith-vith", "chivit", "chirivit", etc. Swallows like to sing a duet.',
        image:
          "https://live.staticflickr.com//65535//48539007512_5029d2a9a0.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC489247-190724_09.10h_huiszwaluw_biesbosch_amaliahoeve_roep_100%2Bex_fouragerend_gezien_%20%282%29.mp3",
      },
      {
        id: 4,
        name: "Nightjar",
        species: "Caprimulgus europaeus",
        description:
          "The nightjar is an inconspicuous bird known for its voice. The song of the nightjar sounds like a monotonous trill similar to the rattle of a motorcycle. This rattle can be heard from dusk to dawn, its tone, frequency and volume vary.",
        image: "https://live.staticflickr.com/65535/48456345286_dbc8530027.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC486956-190623_22.37h_nachtzwaluw_rechte%20heide_zang_ad%20_2ex_gezien_.mp3",
      },
      {
        id: 5,
        name: "Cuckoo",
        species: "Cuculus canorus",
        description:
          'The cuckoo is so called because of the peculiarities of its songs. The sonorous "cuckoo" cannot be confused with any other bird. Cuckoos do not build nests, their offspring are raised by other species of birds, to which cuckoos drop their eggs.',
        image: "https://live.staticflickr.com/65535/48377838151_e15f430ec1.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC501461-190616_08.13h_koekoek_brabantse%20biesbosch%20jantjesplaat_roep_1%20ex_ad%20m_ter%20plaatse%20zingend_gezien_.mp3",
      },
      {
        id: 6,
        name: "Tit",
        species: "Parus major",
        description:
          "There are more than 40 different sound combinations in the twittering of tits. They sing practically the whole year round, remaining somewhat quiet only in winter. Tits are real forest sanitarians. One pair of tits protects dozens of trees from pests during the nesting period.",
        image:
          "https://live.staticflickr.com/65535/52474688186_55c01dc093_h.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/RFGQDPLDEC/XC518417-Kj%C3%B8ttmeis%20XC%20Helg%C3%B8ya%20Elias%20A.%20Ryberg20200108133922_079.mp3",
      },
    ],
    [
      {
        id: 1,
        name: "Sparrow",
        species: "Passer domesticus",
        description:
          "Sparrows are the best-known and most recognizable feathered birds. They are easily recognized by their colorful plumage and cheerful chirping. Sparrows are a synatropic species - they settle close to human habitation.",
        image:
          "https://live.staticflickr.com//65535//49366595303_06cf65b07e.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/CXFHOPIVAS/XC503224-191020_0134.mp3",
      },
      {
        id: 2,
        name: "Rook",
        species: "Corvus frugilegus",
        description:
          'Rooks are very intelligent and savvy birds. They use their beak to make and use simple tools. Rooks have developed a reflex to the sounds of a tractor. When they hear "roarin", they fly to the sound - the tractor is plowing the ground, which means there is plenty of food in the area.',
        image:
          "https://live.staticflickr.com//65535//49347123322_291c86b016.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/RLRHCUIPIY/XC512540-gawron%20Suble%2019.12.19%20%2012.35.mp3",
      },
      {
        id: 3,
        name: "Jackdaw",
        species: "Coloeus monedula",
        description:
          'The word "galka" comes from the old Slavic language and is translated as "black." Ravens, jackdaws or other black birds are often called with this word. The Latin name of the jackdaw "monedula" is associated with the word "money" for the bird\'s love of shiny and bright things.',
        image:
          "https://live.staticflickr.com//65535//49237149586_993cf685c5.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC510498-Coloeus%20monedula_2019.11.13_11.55_01.mp3",
      },
      {
        id: 4,
        name: "Thrush",
        species: "Turdus philomelos",
        description:
          "The thrush is the best singer in the passerine order. Its song consists only of beautiful sonorous whistles and short trills. Most often it can be heard in the morning and evening hours. Thrushes sing during the whole period of nesting",
        image: "https://live.staticflickr.com/65535/48979125763_e2534f54bd.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/BLMSIUFTFU/XC513326-190704_1146_TF-Glogow.mp3",
      },
      {
        id: 5,
        name: "Magpie",
        species: "Pica pica",
        description:
          "A magpie is a very industrious bird. She builds up to eight nests and then chooses the best of them. The entrance to the magpie's nest always faces south so that the dwelling is warmer. Magpies are the only birds that recognize themselves in the mirror.",
        image:
          "https://live.staticflickr.com//65535//49360363066_ff02bb6a73.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC500868-Pica%20pica2019.08.23_09.18_02.mp3",
      },
      {
        id: 6,
        name: "Jay",
        species: "Garrulus glandarius",
        description:
          "When a jay gets excited, the tuft on its head ruffles. The bird tries to create an intimidating spectacle. Jays can imitate the voices of other birds, animals, and human-made sounds. They make large stores of acorns and nuts for the winter.",
        image:
          "https://live.staticflickr.com//65535//49369678956_9a7465c7f4.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/TFOGOENSTQ/XC501517-191008_1590%201300.%20Eichelh%C3%A4her%20D%2C%20NW%2C%20LEV.%20Stephan%20Risch.mp3",
      },
    ],
    [
      {
        id: 1,
        name: "Chaffinch",
        species: "Fringilla coelebs",
        description:
          "There are 450 species of chaffinches in the wild. In winter, chaffinches live a gregarious lifestyle. Sometimes you can see sparrows in their families. Chaffinches sing in the spring, with the onset of their mating season. Their singing is a rousing, minute-long roulade.",
        image: "https://live.staticflickr.com/65535/49143150817_2d3a2f6c1e.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC512407-150622_03%20zi%C4%99ba%20%282%29.mp3",
      },
      {
        id: 2,
        name: "Crossbill",
        species: "Loxia curvirostra",
        description:
          'Crossbills are called "Christmas" birds. Under natural conditions, they give birth in winter, in January. These birds insulate their nests with moss and animal hair, so the chicks are not cold. In search of cones, crossbills can fly 3500 km away from their nests.',
        image:
          "https://live.staticflickr.com//65535//49365470123_f2de66bb35.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/OTVUCEGYZN/XC495381-Kruisbek%20roep%20NHD%20290619.mp3",
      },
      {
        id: 3,
        name: "Turtle dove",
        species: "Streptopelia turtur",
        description:
          "The turtle dove lives in mixed and broad-leaved forests, as well as in urban parks and settlements. Birds often choose places to live near people and easily get used to people. Because of their melodious, pleasant singing, turtle doves are often raised in homes.",
        image: "https://live.staticflickr.com/65535/48063004977_84252f9ceb.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC324106-Turkawka_Streptopelia_turtur_Poland_Jarek_Matusiak_2011625_07.mp3",
      },
      {
        id: 4,
        name: "Woodpecker",
        species: "Dendrocopos major",
        description:
          'The woodpecker is a conspicuous and noisy bird that often lives close to humans. From mid-January to the end of June you can hear the "drumming" of woodpeckers - a trill from the vibration of the branches under the rapid blows of the bird\'s beak. In good weather the "drumming" of woodpeckers can be heard within a radius of 1.5 km.',
        image: "https://live.staticflickr.com/65535/49339376578_e933426455.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC518928-AB-017%20dzi%C4%99cio%C5%82%20du%C5%BCy%20agresja%20%282%29.mp3",
      },
      {
        id: 5,
        name: "Hoopoe",
        species: "Upupa epops",
        description:
          "Hoopoes prefer to live in open landscapes with isolated trees or groves. Forest-steppe and savanna areas are the most convenient for the bird. The hoopoe may choose to live near humans: pastures, vineyards, orchards.",
        image:
          "https://live.staticflickr.com//65535//49226383598_6f8be86a06.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC477326-dudek%20%282%29.mp3",
      },
      {
        id: 6,
        name: "Swift",
        species: "Apus apus",
        description:
          "The swift can be seen in almost every corner of the planet. They inhabit both forested areas and open areas. Swifts live in large flocks. Large colonies of these birds can be seen in cities or on coastal cliffs.",
        image:
          "https://live.staticflickr.com//65535//48386150031_7b749df74b.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/TMUAWSDHDJ/XC511871-G.mp3",
      },
    ],
    [
      {
        id: 1,
        name: "Lark",
        species: "Alauda arvensis",
        description:
          "Larks are migratory birds. From the beginning of September, they fly south. They come back at the beginning of March, regardless of whether snow has melted or not. The skylarks have been used to judge when spring came and when it was time to plow the fields.",
        image: "https://live.staticflickr.com/65535/47105096764_f751fba568.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC462158-Skowronek_Alauda_arvensis_Poland_Jarek_Matusiak_%20-006%20skowronek%20%282%29.mp3",
      },
      {
        id: 2,
        name: "Nightingale",
        species: "Luscinia luscinia",
        description:
          "Nightingales sing from early May until the end of summer. Each song of the nightingale consists of 12 repetitive elements, which are also called knees. In addition to their own trills, nightingales easily and well adopt the singing of other birds.",
        image: "https://live.staticflickr.com/7605/27669397735_f3c21758f2.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/HILVWSADVL/XC513809-R07_0052%20Thrush%20Nightingale%20Snipe.mp3",
      },
      {
        id: 3,
        name: "Starling",
        species: "Sturnus vulgaris",
        description:
          "Starlings are migratory birds. The synchronized flight of large flocks of starlings is called murmuration. This is a beautiful and fascinating phenomenon - a lot of birds as if dancing in the air, forming intricate figures that decrease and increase in the sky.",
        image: "https://live.staticflickr.com/65535/49357593971_9509fe1d7c.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC515519-2020.01.01_17.24_01.MP3",
      },
      {
        id: 4,
        name: "Oriole",
        species: "Oriolus oriolus",
        description:
          "The melodiousness of the oriole's voice is compared to the sound of a flute. It is difficult for humans to see the oriole, as it lives high up in the trees. The oriole is not only very beautiful, but also a useful bird. It destroys poisonous caterpillars that other birds do not eat.",
        image: "https://live.staticflickr.com/65535/47102184004_58a93380b9.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC491801-2019.07.07_06.28_01.mp3",
      },
      {
        id: 5,
        name: "Waxwing",
        species: "Bombycilla garrulus",
        description:
          "Waxwing has very tenacious claws that help it to stay on the branches and nibble on the berries hardest to reach. During courtship, the male offers the female a berry or other treat. If the female accepts it, the birds create a pair.",
        image:
          "https://live.staticflickr.com//65535//49367433842_1b06da0e6b.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC517421-AB-004%20%282%29%20jemio%C5%82uszka.mp3",
      },
      {
        id: 6,
        name: "Goldfinch",
        species: "Carduelis carduelis",
        description:
          "Goldfinches sing beautifully and melodiously. Both in nature and in captivity, they chirp almost year round. The twitterer goldfinch over 20 iridescent trills. Goldfinches get used to people, and can even return to the owner after being released into the wild.",
        image:
          "https://live.staticflickr.com//65535//49366257253_db3ce48b9a.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC489265-190724_07.58h_putter_biesbosch_%20boompjes%20langs%20open%20water_zang_1ex_ad_niet%20gezien_.mp3",
      },
    ],
    [
      {
        id: 1,
        name: "Eagle",
        species: "Aquila nipalensis",
        description:
          "In ancient times, the eagle was a symbol of the sun. Eagles often soar above the ground, with a speed of up to 240 km/h. The illusion of slow movement is due to the height of the flight - more than 700 meters.",
        image:
          "https://live.staticflickr.com//4835//43867392960_7105d71e19.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/KTBTZAHSXF/10_Aquila_nipalensis_al02D85.mp3",
      },
      {
        id: 2,
        name: "Kite",
        species: "Milvus migrans",
        description:
          "Kites are large raptors, they reach about half a meter in height and adults weigh up to 1 kg. Their wings are narrow and long, with a wingspan of 1.5 m. Kites often nest in large flocks and even form large colonies.",
        image:
          "https://live.staticflickr.com//65535//48701190276_ee2a9ed594.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/SDPCHKOHRH/XC485740-2019-06-22%20Selenga%20Milan%20brun%20cris%20de%20quemandage%203.mp3",
      },
      {
        id: 3,
        name: "Harrier",
        species: "Circus cyaneus",
        description:
          'The Harrier is a small falcon. It feeds mainly on rodents; voles, hamsters, and mice are the basis of its diet. The plumage of the harrier may be ash-gray. Associated with such a bird is the comparison "gray-haired as a harrier".',
        image: "https://live.staticflickr.com/4480/37240531151_b74619c99d.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/BLMSIUFTFU/XC513498-190709_1175_Cir.cyan-f.mp3",
      },
      {
        id: 4,
        name: "Falcon",
        species: "Falco peregrinus",
        description:
          'The Latin name Falcon was derived from the word "sickle" because of the sickle-like shape of its wings. The long and wide wings allow the falcon to rise high into the sky and soar freely. The flight speed of a falcon reaches 280-320 kilometers per hour.',
        image:
          "https://live.staticflickr.com//65535//49310710607_92a3a145a9.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC496049-Pilgrimsfalk_06.mp3",
      },
      {
        id: 5,
        name: "Hawk",
        species: "Accipiter gentilis",
        description:
          'All hawks are characterized by wide and short wings. Another distinctive feature is the white "eyebrows" above the eyes. Slavic vigilantes placed the image of a hawk on their banners, as a symbol of courage, power and ruthlessness to the enemies.',
        image:
          "https://live.staticflickr.com//65535//49024617331_b9d0d2c9b3.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3",
      },
      {
        id: 6,
        name: "Owl",
        species: "Bubo bubo",
        description:
          "The flight of an owl is silent, and the vision is very acute. These features make the bird a consummate night hunter. The owl has no natural enemies, no animal hunts adult birds. But chicks are attacked by foxes and wolves.",
        image: "https://live.staticflickr.com/65535/48137123012_393653c2e4.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/WNLIDKJKXT/XC518386-sense%20t%C3%ADtol.mp3",
      },
    ],
    [
      {
        id: 1,
        name: "Albatross",
        species: "Diomedea exulans",
        description:
          "The albatross is the largest flying bird in the world. It has a wingspan of three and a half meters and weighs ten kilograms. Albatrosses spend most of their lives in the air, covering vast distances over the ocean expanses.",
        image: "https://live.staticflickr.com/7557/16260253965_8e9430cb66.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/WOEAFQRMUD/XC293087-Diomedea%20exulans151120_T254.mp3",
      },
      {
        id: 2,
        name: "Booby",
        species: "Sula nebouxii",
        description:
          "The peculiarity of the blue-footed booby is not only the rich bright blue color of its feet, but also the fact that they are very warm. While other birds warm their clutches with their bodies, the blue-footed booby does it with its paws.",
        image: "https://live.staticflickr.com/800/40645471394_4422e69ed8.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/YHKQPPJDVP/XC411507-171217_1491%20BF%20Booby%205ft%20IDLP%201230%20mp3%20amp.mp3",
      },
      {
        id: 3,
        name: "Petrel",
        species: "Puffinus griseus",
        description:
          "Petrels vary in size. The smallest of them are up to 25 cm in length, the largest - up to 1 m, with a wingspan of about 2 m. There is a belief that the appearance of the petrel in the air portends a storm, as the name of the bird itself indicates.",
        image: "https://live.staticflickr.com//607//22136056020_935cb113f9.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/XQEVNREHJY/SHEARWATER%20Christmas%20Island_04_Motu_Isla%20de%20Pascua-Easter%20Island_CH_4MAR03_Alvaro%20Jaramillo.mp3",
      },
      {
        id: 4,
        name: "Pelican",
        species: "Pelecanus",
        description:
          "Pelicans are inhabitants of seas and rivers. They walk clumsily, but fly and swim well. They feed mainly on fish, arrange collective hunts: they line up in a semicircle and flap the water with their wings and beak, thus driving away the frightened fish to shallow waters.",
        image: "https://live.staticflickr.com/3230/2859474923_06a28c008d_k.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/XAMHIHFTZG/XC331138-call1.mp3",
      },
      {
        id: 5,
        name: "Penguin",
        species: "Aptenodytes forsteri",
        description:
          "The male Emperor penguin reaches a height of 130 cm and its mass can approach 50 kg. Of all modern penguins, this species is the largest. The diet of the penguin consists of fish, squid and krill. The birds hunt in the ocean in large groups.",
        image: "https://live.staticflickr.com/5202/5252413926_8e013a3efd.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/OOECIWCSWV/XC449827-LS100829%20King%20Penguin%20call%20A.mp3",
      },
      {
        id: 6,
        name: "Larus",
        species: "Larus argentatus",
        description:
          "Laruses inhabit the shores of seas, lakes, rivers, reservoirs, and marshes; they often nest on islands. Since the end of the last century seagulls began to appear in large cities, where they make nests on the roofs of buildings. All laruses lead a colonial lifestyle.",
        image: "https://live.staticflickr.com/65535/48577115317_7034201dde.jpg",
        audio:
          "https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC501190-190801_06.50h_zilvermeeuw_duinen%20van%20goeree_roep_2ex_overvliegend_gezien_.mp3",
      },
    ],
  ];
  var lang = {
    "index-html-title": { ru: "Главная", en: "Home" },
    "game-html-title": { ru: "Игра", en: "Game" },
    "finish-html-title": { ru: "Финал", en: "Finish" },
    "achievements-html-title": { ru: "Достижения", en: "Achievements" },
    "gallery-html-title": { ru: "Галерея", en: "Gallery" },
    "game-link": { ru: "Игра", en: "Game" },
    "gallery-link": { ru: "Галерея", en: "Gallery" },
    "achievements-link": { ru: "Достижения", en: "Achievements" },
    "footer-game-link": { ru: "Игра", en: "Game" },
    "footer-gallery-link": { ru: "Галерея", en: "Gallery" },
    "footer-achievements-link": { ru: "Достижения", en: "Achievements" },
    "index-title": { ru: "«Голоса птиц»", en: "«Birds voices»" },
    "index-subtitle": { ru: "Викторина", en: "Quiz" },
    "index-subtext": {
      ru: "Угадайте птицу по звучанию",
      en: "Guess the bird by singing",
    },
    "index-button": { ru: "Начать игру", en: "Start the game" },
    "game-button-start": { ru: "Новая игра", en: "New game" },
    "game-bird-rules": {
      ru: "Послушайте плеер.<br>Выберите птицу из списка.",
      en: "Listen to the player.<br>Choose a bird from the list",
    },
    "tab-name-intro": { ru: "Разминка", en: "Intro" },
    "tab-name-sparrows": { ru: "Воробьиные", en: "Sparrows" },
    "tab-name-sylvan": { ru: "Лесные", en: "Sylvan" },
    "tab-name-singing": { ru: "Певчие", en: "Singing" },
    "tab-name-predators": { ru: "Хищные", en: "Predators" },
    "tab-name-marine": { ru: "Морские", en: "Marine" },
    "gallery-title": { ru: "Галерея", en: "Gallery" },
    "new-game-button": { ru: "Начать новую игру", en: "Start new game" },
    "form-button-save": { ru: "Сохранить результат", en: "Save the result" },
    "achievements-title": {
      ru: "ТОП-10 достижений",
      en: "TOP-10 achievements",
    },
    "achievements-subtitle": {
      ru: "Пока результатов нет. Пройдите игру.",
      en: "There are no results yet. Beat the game first.",
    },
    "result-score": { ru: "Баллы", en: "Score" },
    "result-name": { ru: "Игрок", en: "Player" },
    "result-date": { ru: "Дата", en: "Date" },
    "congratulation-title": { ru: "Игра окончена!", en: "The game is over!" },
  };
  let answerButtons = document.querySelectorAll(".answers__button");
  const script_tabs = document.querySelectorAll(".tab"),
    nextButton = document.querySelector(".button-next"),
    quizAudioPlayer = document.querySelector(".quiz__audio-player"),
    quizImage = document.querySelector(".quiz__image"),
    quizName = document.querySelector(".quiz__name"),
    soundEffectsSwitcher = document.querySelector(".header__audio-switcher"),
    languageSwitcher = document.querySelector(".header__language");
  let birdsData = birds,
    playerName = "Anonimus",
    result = {},
    formInput = document.querySelector(".form__input");
  const langRu = document.querySelector(".lang-ru"),
    langEn = document.querySelector(".lang-en");
  let language =
    JSON.parse(localStorage.getItem("SONG_BIRD_ELIAN-language")) || "ru";
  function setLanguage(lang) {
    localStorage.setItem("SONG_BIRD_ELIAN-language", JSON.stringify(lang));
  }
  langRu.addEventListener("click", () => {
    location.reload(), (language = "ru"), setLanguage(language);
  }),
    langEn.addEventListener("click", () => {
      location.reload(), (language = "en"), setLanguage(language);
    }),
    (function changeItemsLanguage() {
      "ru" === language
        ? (languageSwitcher.classList.add("language-russian"),
          languageSwitcher.classList.remove("language-english"),
          (languageSwitcher.title = "Сменить язык"),
          (soundEffectsSwitcher.title = "Вкл/выкл эффекты"),
          (birdsData = birds))
        : "en" === language &&
          (languageSwitcher.classList.add("language-english"),
          languageSwitcher.classList.remove("language-russian"),
          (languageSwitcher.title = "Change the language"),
          (soundEffectsSwitcher.title = "Sound effects on/off"),
          (birdsData = birds_en));
    })(),
    (function changeLanguage() {
      for (let key in lang) {
        let item = document.querySelector(`.${key}`);
        item && (item.innerHTML = lang[key][language]);
      }
    })();
  const trueSound = new Audio("./files/audio/success.mp3"),
    falseSound = new Audio("./files/audio/fail.mp3"),
    getRandomIndex = length => Math.floor(Math.random() * Math.floor(length));
  let secretBird = birdsData[0][getRandomIndex(6)];
  console.log(secretBird);
  let level = 0,
    isRight = !1,
    falseAnswers = [],
    score = 0,
    answer = "";
  function setNextButton() {
    (nextButton.className = isRight
      ? "main__button button-next"
      : "main__button button-next button_inactive"),
      (nextButton.disabled = !isRight),
      (nextButton.innerText =
        "en" === language
          ? 5 !== level
            ? "Next question"
            : "Proceed to results"
          : 5 !== level
          ? "Следующий вопрос"
          : "Перейти к результату"),
      5 === level &&
        nextButton.addEventListener("click", function redirectFunction() {
          location.href = `./game-over.html?${score}`;
        }),
      nextButton.addEventListener("click", handleLevel),
      nextButton.addEventListener("click", setLevel),
      nextButton.addEventListener("click", setGame),
      nextButton.addEventListener("click", resetAudioPlay);
  }
  function setLevel() {
    script_tabs.forEach((tab, index) => {
      tab.className =
        level === index
          ? "tabs__item level level_active"
          : level > index
          ? "tabs__item level level_done"
          : "tabs__item level";
    });
  }
  function handleLevel() {
    level < 5
      ? ((falseAnswers = []),
        (answer = ""),
        (isRight = !1),
        (secretBird = birdsData[level + 1][getRandomIndex(6)]),
        console.log(secretBird),
        level++)
      : level++;
  }
  function handleScore() {
    const scoreString = document.querySelector(".main__score");
    scoreString.innerText =
      "en" === language ? `Score: ${score}` : `Счёт: ${score}`;
  }
  function setQuiz() {
    isRight
      ? ((quizImage.src = secretBird.image),
        (quizName.innerText = secretBird.name),
        resetAudioPlay())
      : ((quizImage.src = "./img/bird.jpg"),
        (quizAudioPlayer.src = secretBird.audio),
        (quizName.innerText = "*****"));
  }
  function checkAnswer() {
    isRight ||
      (secretBird.name === answer
        ? ((trueSound.currentTime = 0),
          trueSound.play(),
          (score = score + 5 - falseAnswers.length),
          handleScore(),
          (isRight = !0),
          setQuiz(),
          setNextButton())
        : ((falseAnswers = [...falseAnswers, answer]),
          (falseSound.currentTime = 0),
          falseSound.play()));
  }
  function setDescription() {
    const birdRules = document.querySelector(".bird__rules"),
      birdBody = document.querySelector(".bird__body");
    if (answer) {
      birdRules.classList.add("invisible"),
        birdBody.classList.remove("invisible");
      let bird = birdsData[level].find(item => item.name === answer);
      const birdImage = document.querySelector(".bird__image");
      (birdImage.alt = "bird"), (birdImage.src = bird.image);
      document.querySelector(".bird__name").innerText = bird.name;
      document.querySelector(".bird__species").innerText = bird.species;
      const birdAudioPlayer = document.querySelector(".bird__audio-player");
      (birdAudioPlayer.src = bird.audio), (birdAudioPlayer.title = bird.audio);
      document.querySelector(".bird__description").innerText = bird.description;
    } else
      birdBody.classList.add("invisible"),
        birdRules.classList.remove("invisible");
  }
  function setGame() {
    setQuiz(),
      (function setAnswers() {
        for (let i = 0; i < 6; i++)
          (answerButtons[i].innerText = birdsData[level][i].name),
            (answerButtons[i].className = "answers__button");
        answerButtons.forEach(button => {
          button.addEventListener("click", () => (answer = button.innerText)),
            button.addEventListener("click", checkAnswer),
            button.addEventListener("click", setDescription),
            button.addEventListener("click", function handleAnswerColor() {
              button.className =
                isRight && button.innerText === secretBird.name
                  ? "answers__button answers__button_true"
                  : falseAnswers.find(
                      falseItem => falseItem === button.innerText
                    )
                  ? "answers__button answers__button_false"
                  : "answers__button";
            });
        });
      })(),
      setNextButton(),
      setDescription(),
      setLevel(),
      handleScore();
  }
  if (
    (soundEffectsSwitcher.addEventListener("click", () => {
      trueSound.muted && falseSound.muted
        ? ((trueSound.muted = !1),
          (falseSound.muted = !1),
          (soundEffectsSwitcher.className =
            "header__audio-switcher icon-sound-on"))
        : ((trueSound.muted = !0),
          (falseSound.muted = !0),
          (soundEffectsSwitcher.className =
            "header__audio-switcher icon-sound-off"));
    }),
    document.body.classList.contains("game"))
  ) {
    document.querySelector("title").innerHTML =
      lang["game-html-title"][language];
    document
      .querySelector(".button-start")
      .addEventListener("click", function handleRepeatGame() {
        (score = 0),
          (level = 0),
          (answer = ""),
          (falseAnswers = []),
          (isRight = !1),
          (secretBird = birdsData[0][getRandomIndex(6)]),
          console.log(secretBird),
          setGame();
      }),
      setGame(),
      startPlayers();
  } else if (document.body.classList.contains("game-over")) {
    document.querySelector("title").innerHTML =
      lang["finish-html-title"][language];
    let congratulationText,
      points = location.href.split("?")[1] || 0;
    "en" === language
      ? ((formInput.placeholder = "Write your name here"),
        30 === points
          ? (congratulationText =
              "You reached the maximum score! <br> Congratulations, you are a great ornitologist!")
          : points < 0 || points > 30
          ? ((congratulationText = "Nope! No cheating!"),
            document.querySelector("form").classList.add("invisible"))
          : (congratulationText = `You've got <span>${points}</span> out of 30 points. Try again.`))
      : 30 === points
      ? (congratulationText =
          "Вы набрали максимальное количество баллов! <br> Поздравляем, Вы отлично разбираетесь в птицах!")
      : points < 0 || points > 30
      ? ((congratulationText = "Ай-яй-яй! Не мухлевать!"),
        document.querySelector("form").classList.add("invisible"))
      : (congratulationText = `Вы набрали <span>${points}</span> из 30 баллов. Попробуйте ещё раз.`);
    document.querySelector(".congratulation__subtitle").innerHTML =
      congratulationText;
    document
      .querySelector(".form__button")
      .addEventListener("click", function (e) {
        e.preventDefault(),
          (function saveEnteredName(points) {
            if (
              ((playerName = document.querySelector(".form__input").value),
              !playerName)
            )
              return void (function addFormError() {
                formInput.classList.add("_form-error"),
                  formInput.parentElement.classList.add("_form-error");
                let inputError =
                  formInput.parentElement.querySelector(".form__error");
                inputError && formInput.parentElement.removeChild(inputError);
                "en" === language
                  ? formInput.dataset.error &&
                    formInput.parentElement.insertAdjacentHTML(
                      "beforeend",
                      '<div class="form__error">Wrong name</div>'
                    )
                  : formInput.dataset.error &&
                    formInput.parentElement.insertAdjacentHTML(
                      "beforeend",
                      `<div class="form__error">${formInput.dataset.error}</div>`
                    );
              })();
            (result = {
              player: playerName,
              time: new Date().toLocaleDateString(),
              score: points,
            }),
              (function saveResults(result) {
                if (null === localStorage.getItem("SONG_BIRD_ELIAN-results")) {
                  const results = [];
                  results.push(result),
                    localStorage.setItem(
                      "SONG_BIRD_ELIAN-results",
                      JSON.stringify(results)
                    );
                } else {
                  let results = JSON.parse(
                    localStorage.getItem("SONG_BIRD_ELIAN-results")
                  );
                  results.push(result),
                    results.sort((a, b) =>
                      a.score < b.score ? 1 : a.score > b.score ? -1 : 0
                    ),
                    results.length > 10 && (results = results.slice(0, 10)),
                    localStorage.setItem(
                      "SONG_BIRD_ELIAN-results",
                      JSON.stringify(results)
                    );
                }
              })(result),
              setTimeout(() => {
                location.href = "./achievements.html";
              }, 440);
          })(points);
      });
  } else if (document.body.classList.contains("achievements"))
    (document.querySelector("title").innerHTML =
      lang["achievements-html-title"][language]),
      (function getResults() {
        if (null === localStorage.getItem("SONG_BIRD_ELIAN-results")) return;
        document
          .querySelector(".achievements__subtitle")
          .classList.add("invisible");
        const achievementsList = document.querySelector(".achievements__list");
        achievementsList.classList.remove("invisible");
        JSON.parse(localStorage.getItem("SONG_BIRD_ELIAN-results")).forEach(
          item => {
            let resultItem = document.createElement("li");
            (resultItem.className = "achievements__item"),
              (resultItem.innerHTML = `<span class="achievements__result result-score">${item.score}</span> <span class="achievements__result result-name">${item.player}</span> <span class="achievements__result result-date">${item.time}</span>`),
              achievementsList.append(resultItem);
          }
        );
      })();
  else if (document.body.classList.contains("gallery")) {
    document.querySelector("title").innerHTML =
      lang["gallery-html-title"][language];
    const tabButtons = document.querySelectorAll(".tabs__title"),
      tabContents = document.querySelectorAll(".tabs__body");
    let activeTab = tabContents[0];
    createSlider(activeTab),
      document.addEventListener("click", e => {
        const targetElement = e.target;
        let currentActiveIndex, newActiveIndex;
        targetElement.closest(".tabs__title") &&
          (tabButtons.forEach((tabButton, index) => {
            tabButton.classList.contains("tab_active") &&
              ((currentActiveIndex = index),
              tabButton.classList.remove("tab_active")),
              tabButton === targetElement && (newActiveIndex = index);
          }),
          targetElement.classList.add("tab_active"),
          tabContents[currentActiveIndex].classList.remove("tab_active"),
          (tabContents[currentActiveIndex].innerHTML = ""),
          tabContents[newActiveIndex].classList.add("tab_active"),
          (activeTab = tabContents[newActiveIndex]),
          createSlider(activeTab),
          startPlayers());
      }),
      startPlayers();
  } else
    document.querySelector("title").innerHTML =
      lang["index-html-title"][language];
  function createSlider(tab) {
    const container = document.createElement("div");
    let data;
    (container.className = "slider__container"),
      tab.appendChild(container),
      (data = tab.classList.contains("tab-intro")
        ? birdsData[0]
        : tab.classList.contains("tab-sparrows")
        ? birdsData[1]
        : tab.classList.contains("tab-forest")
        ? birdsData[2]
        : tab.classList.contains("tab-song")
        ? birdsData[3]
        : tab.classList.contains("tab-predator")
        ? birdsData[4]
        : birdsData[5]),
      1 === data.length &&
        ((nextBtn.style.display = "none"), (prevBtn.style.display = "none"));
    let birds = [...data];
    container.innerHTML = birds
      .map((bird, slideIndex) => {
        const {
          image: image,
          name: name,
          species: species,
          description: description,
          audio: audio,
        } = bird;
        let position = "next";
        return (
          0 === slideIndex && (position = "active"),
          slideIndex === birds.length - 1 && (position = "last"),
          data.length <= 1 && (position = "active"),
          `<article class="slider__card slide ${position}">\n      <div class="slide__title"><h4 class="slide__name">${name}</h4><span>/</span><p class="slide__species">${species}</p></div>\n      <div class="slide__image"><img src=${image} alt="${name}"/></div>\n      <div class="slide__audio audio" id="audio-player-0">\n      <audio class="slide__audio-player audio-player" id="" preload="metadata" src=${audio} title=${audio}>\n        <p>Your browser does not support the <code>audio</code> element.</p>\n      </audio>\n      <div class="slide__audio-controls audio-controls">\n      <div class="slide__play-controls play-controls">\n        <button class="slide__play-button audio-play-button"></button>\n        <div class="slide__audio-progress audio-progress">\n          <div class="slide__audio-playtime audio-playtime">00:00</div>\n          <input type="range" min="0" max="100" value="0" class="slide__progressbar audio-progressbar">\n          <div class="slide__audio-duration audio-duration">00:00</div>\n        </div>\n        </div>\n        <div class="slide__volume-controls volume-controls">\n          <button class="slide__volume-button audio-volume-button icon-sound-on"></button>\n          <input type="range" min="0" max="100" value="100" class="slide__volumebar audio-volumebar">\n          <div class="slide__repeat-button audio-repeat-button icon-loop-cancel"></div>\n        </div>\n      </div>\n    </div>\n      <p class="slide__description">\n      ${description}\n     </p>\n       </article>`
        );
      })
      .join("");
    const startSlider = type => {
        const active = document.querySelector(".active"),
          last = document.querySelector(".last");
        let next = active.nextElementSibling;
        if (
          (next || (next = container.firstElementChild),
          active.classList.remove("active"),
          last.classList.remove("last"),
          "prev" === type)
        )
          return (
            active.classList.add("next"),
            last.classList.add("active"),
            (next = last.previousElementSibling),
            next || (next = container.lastElementChild),
            next.classList.remove("next"),
            void next.classList.add("last")
          );
        next.classList.remove("next"),
          active.classList.add("last"),
          last.classList.add("next"),
          next.classList.add("active");
      },
      nextBtn = document.createElement("button");
    (nextBtn.className = "btn next-btn icon-arrow-bold"),
      tab.appendChild(nextBtn);
    const prevBtn = document.createElement("button");
    (prevBtn.className = "btn prev-btn icon-arrow-bold"),
      tab.appendChild(prevBtn),
      nextBtn.addEventListener("click", () => {
        startSlider(), resetAudioPlay();
      }),
      prevBtn.addEventListener("click", () => {
        startSlider("prev"), resetAudioPlay();
      });
  }
  function startPlayers() {
    let audioPlayers = document.querySelectorAll(".audio");
    function resetPlayback(id) {
      audioPlayers.forEach(audioPlayer => {
        audioPlayer.getAttribute("id") !== id &&
          audioPlayer.querySelector("audio").pause(),
          audioPlayer.classList.remove("is-playing");
      });
    }
    audioPlayers.forEach((audioPlayer, index) => {
      let audioTrack = audioPlayer.querySelector("audio");
      audioTrack.load();
      let id = "audio-player-" + index;
      audioPlayer.setAttribute("id", id),
        setInterval(function seekUpdate() {
          let seekPosition = 0;
          if (!isNaN(audioTrack.duration)) {
            (seekPosition =
              audioTrack.currentTime * (100 / audioTrack.duration)),
              (audioProgressbar.value = seekPosition);
            let currentMinutes = Math.floor(audioTrack.currentTime / 60),
              currentSeconds = Math.floor(
                audioTrack.currentTime - 60 * currentMinutes
              ),
              durationMinutes = Math.floor(audioTrack.duration / 60),
              durationSeconds = Math.floor(
                audioTrack.duration - 60 * durationMinutes
              );
            currentSeconds < 10 && (currentSeconds = "0" + currentSeconds),
              durationSeconds < 10 && (durationSeconds = "0" + durationSeconds),
              currentMinutes < 10 && (currentMinutes = "0" + currentMinutes),
              durationMinutes < 10 && (durationMinutes = "0" + durationMinutes),
              (audioPlaytime.textContent =
                currentMinutes + ":" + currentSeconds),
              (audioDuration.textContent =
                durationMinutes + ":" + durationSeconds);
          }
        }, 1e3);
      let audioPlayButton = audioPlayer.querySelector(".audio-play-button"),
        audioRepeatButton = audioPlayer.querySelector(".audio-repeat-button"),
        audioVolumeButton = audioPlayer.querySelector(".audio-volume-button"),
        audioProgressbar = audioPlayer.querySelector(".audio-progressbar"),
        audioVolumebar = audioPlayer.querySelector(".audio-volumebar"),
        audioPlaytime = audioPlayer.querySelector(".audio-playtime"),
        audioDuration = audioPlayer.querySelector(".audio-duration");
      (audioPlaytime.textContent = "00:00"),
        (audioDuration.textContent = "00:00"),
        (audioProgressbar.value = 0),
        audioProgressbar.addEventListener("change", function seekTo() {
          let seekto = audioTrack.duration * (audioProgressbar.value / 100);
          audioTrack.currentTime = seekto;
        }),
        audioVolumebar.addEventListener("change", function setVolume() {
          audioTrack.volume = audioVolumebar.value / 100;
        }),
        audioVolumeButton.addEventListener("click", function changeVolume() {
          audioTrack.muted
            ? ((audioTrack.muted = !1),
              audioVolumeButton.classList.remove("icon-sound-off"),
              audioVolumeButton.classList.add("icon-sound-on"),
              (audioVolumebar.value = 100))
            : ((audioTrack.muted = !0),
              audioVolumeButton.classList.remove("icon-sound-on"),
              audioVolumeButton.classList.add("icon-sound-off"),
              (audioVolumebar.value = 0));
        }),
        audioRepeatButton.addEventListener("click", function repeatAudio() {
          audioTrack.loop
            ? ((audioTrack.loop = !1),
              audioRepeatButton.classList.remove("icon-loop"),
              audioRepeatButton.classList.add("icon-loop-cancel"))
            : ((audioTrack.loop = !0),
              audioRepeatButton.classList.remove("icon-loop-cancel"),
              audioRepeatButton.classList.add("icon-loop"));
        }),
        audioPlayButton.addEventListener("click", function () {
          resetPlayback(id),
            (function playPauseTrack(player, audio) {
              audio.paused
                ? (audio.play(), player.classList.add("is-playing"))
                : (audio.pause(), player.classList.remove("is-playing"));
            })(audioPlayer, audioTrack);
        }),
        audioTrack.loop ||
          audioTrack.addEventListener("ended", () => {
            resetPlayback(), audioTrack.load();
          });
    });
  }
  function resetAudioPlay() {
    document.querySelectorAll(".audio").forEach(audioPlayer => {
      audioPlayer.querySelector("audio").pause(),
        audioPlayer.classList.remove("is-playing");
    });
  }
  !(function menuInit() {
    document.querySelector(".icon-menu") &&
      document.addEventListener("click", function (e) {
        bodyLockStatus &&
          e.target.closest(".icon-menu") &&
          (((delay = 500) => {
            document.documentElement.classList.contains("lock")
              ? bodyUnlock(delay)
              : bodyLock(delay);
          })(),
          document.documentElement.classList.toggle("menu-open"));
      });
  })(),
    (function formFieldsInit(options = { viewPass: !1, autoHeight: !1 }) {
      const formFields = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      formFields.length &&
        formFields.forEach(formField => {
          formField.hasAttribute("data-placeholder-nohide") ||
            (formField.dataset.placeholder = formField.placeholder);
        }),
        document.body.addEventListener("focusin", function (e) {
          const targetElement = e.target;
          ("INPUT" !== targetElement.tagName &&
            "TEXTAREA" !== targetElement.tagName) ||
            (targetElement.dataset.placeholder &&
              (targetElement.placeholder = ""),
            targetElement.hasAttribute("data-no-focus-classes") ||
              (targetElement.classList.add("_form-focus"),
              targetElement.parentElement.classList.add("_form-focus")),
            formValidate.removeError(targetElement));
        }),
        document.body.addEventListener("focusout", function (e) {
          const targetElement = e.target;
          ("INPUT" !== targetElement.tagName &&
            "TEXTAREA" !== targetElement.tagName) ||
            (targetElement.dataset.placeholder &&
              (targetElement.placeholder = targetElement.dataset.placeholder),
            targetElement.hasAttribute("data-no-focus-classes") ||
              (targetElement.classList.remove("_form-focus"),
              targetElement.parentElement.classList.remove("_form-focus")),
            targetElement.hasAttribute("data-validate") &&
              formValidate.validateInput(targetElement));
        });
    })({ viewPass: !1, autoHeight: !1 }),
    console.log(
      "Score: 270. All features and design implemented according to the requirements."
    );
})();
