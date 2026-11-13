// The 40 entries of Level 1, in teaching order.
//
// letter    the glyph shown on the tile
// name      the lesson name. Letter audio is keyed by THIS, not by the glyph,
//           because ی and و each appear twice as different letters.
// forms     initial/medial/final, or a `custom` list for the vowel marks
// examples  one per form. `highlight` is coloured red in the example word:
//           a string matches a contiguous run ("خوا"), an array matches
//           individual characters.
export const letters = [
  {
    "level": 1,
    "letter": "آ",
    "name": "Alef (ā)",
    "roman": "aa",
    "forms": {
      "isolated": "آ",
      "initial": "آ",
      "medial": "ا",
      "final": "ا"
    },
    "examples": [
      {
        "word": "آب",
        "roman": "āb",
        "meaning": "water",
        "highlight": "آ"
      },
      {
        "word": "با",
        "roman": "bā",
        "meaning": "with",
        "highlight": "ا"
      },
      {
        "word": "بابا",
        "roman": "bābā",
        "meaning": "daddy",
        "highlight": "ا"
      }
    ],
    "quiz": {
      "question": "water (āb)",
      "correct": "آ",
      "wrong": "ا",
      "hint": "Long Alef (آ) has a mark on top — plain Alef (ا) does not!",
      "perQ": [
        {
          "correct": "آ",
          "wrong": "ا"
        },
        {
          "correct": "ا",
          "wrong": "آ"
        },
        {
          "correct": "ا",
          "wrong": "آ"
        }
      ]
    }
  },
  {
    "level": 1,
    "letter": "ب",
    "name": "Be",
    "roman": "b",
    "forms": {
      "isolated": "ب",
      "initial": "بـ",
      "medial": "ب",
      "final": "ب",
      "upperLabel": "Uppercase",
      "lowerLabel": "Lowercase",
      "upper": "ب",
      "lower": "بـ"
    },
    "examples": [
      {
        "word": "آب",
        "roman": "āb",
        "meaning": "water",
        "highlight": "ب"
      },
      {
        "word": "بابا",
        "roman": "bābā",
        "meaning": "daddy",
        "highlight": "ب"
      },
      {
        "word": "با",
        "roman": "bā",
        "meaning": "with",
        "highlight": "ب"
      }
    ],
    "quiz": {
      "question": "daddy (bābā)",
      "correct": "بـ",
      "wrong": "پـ",
      "hint": "Be has 1 dot below!"
    }
  },
  {
    "level": 1,
    "letter": "د",
    "name": "Dal",
    "roman": "d",
    "forms": {
      "isolated": "د",
      "initial": "د",
      "medial": "د",
      "final": "د"
    },
    "examples": [
      {
        "word": "داد",
        "roman": "daad",
        "meaning": "shout",
        "highlight": "د"
      },
      {
        "word": "آباد",
        "roman": "āābād",
        "meaning": "thriving",
        "highlight": "د"
      },
      {
        "word": "باد",
        "roman": "bād",
        "meaning": "wind",
        "highlight": "د"
      }
    ],
    "quiz": {
      "question": "wind (bād)",
      "correct": "د",
      "wrong": "ذ",
      "hint": "Dal has no dot!"
    }
  },
  {
    "level": 1,
    "letter": "َ",
    "name": "Short a",
    "roman": "a",
    "forms": {
      "isolated": "َ",
      "initial": "اَ",
      "initialLabel": "Alef + a",
      "medial": "بَ",
      "medialLabel": "Be + a"
    },
    "examples": [
      {
        "word": "اَدَب",
        "roman": "adab",
        "meaning": "manners",
        "highlight": "َ"
      },
      {
        "word": "بَد",
        "roman": "bad",
        "meaning": "bad",
        "highlight": "َ"
      },
      {
        "word": "اَدَب",
        "roman": "adab",
        "meaning": "manners",
        "highlight": "َ"
      }
    ],
    "quiz": {
      "question": "bad (bad)",
      "correct": "بَ",
      "wrong": "بِ",
      "hint": "Short 'a' sits above the letter!"
    }
  },
  {
    "level": 1,
    "letter": "م",
    "name": "Mim",
    "roman": "m",
    "forms": {
      "isolated": "م",
      "initial": "مـ",
      "medial": "مـ",
      "final": "م"
    },
    "examples": [
      {
        "word": "ما",
        "roman": "mā",
        "meaning": "we/us",
        "highlight": "م"
      },
      {
        "word": "آمد",
        "roman": "āmad",
        "meaning": "came",
        "highlight": "م"
      },
      {
        "word": "دام",
        "roman": "dām",
        "meaning": "trap",
        "highlight": "م"
      }
    ],
    "quiz": {
      "question": "roof (bām)",
      "correct": "مـ",
      "wrong": "نـ",
      "hint": "Mim has a small round head!"
    }
  },
  {
    "level": 1,
    "letter": "س",
    "name": "Sin",
    "roman": "s",
    "forms": {
      "isolated": "س",
      "initial": "سـ",
      "medial": "سـ",
      "final": "س"
    },
    "examples": [
      {
        "word": "سبد",
        "roman": "sabad",
        "meaning": "basket",
        "highlight": "س"
      },
      {
        "word": "اسب",
        "roman": "asb",
        "meaning": "horse",
        "highlight": "س"
      },
      {
        "word": "آدامس",
        "roman": "adams",
        "meaning": "gum",
        "highlight": "س"
      }
    ],
    "quiz": {
      "question": "basket (sabad)",
      "correct": "سـ",
      "wrong": "شـ",
      "hint": "Sin has 3 teeth, no dots!"
    }
  },
  {
    "level": 1,
    "letter": "او",
    "name": "Alef + Vav (oo)",
    "roman": "oo",
    "forms": {
      "isolated": "او",
      "initial": "او",
      "medial": "و",
      "final": "و"
    },
    "examples": [
      {
        "word": "او",
        "roman": "oo",
        "meaning": "he/she",
        "highlight": "و"
      },
      {
        "word": "دود",
        "roman": "dood",
        "meaning": "smoke",
        "highlight": "و"
      },
      {
        "word": "مو",
        "roman": "moo",
        "meaning": "hair",
        "highlight": "و"
      }
    ],
    "quiz": {
      "question": "smoke (dood)",
      "correct": "ـو",
      "wrong": "ـر",
      "hint": "Vav has a round head on a tail!"
    }
  },
  {
    "level": 1,
    "letter": "ت",
    "name": "Te",
    "roman": "t",
    "forms": {
      "isolated": "ت",
      "initial": "تـ",
      "medial": "تـ",
      "final": "ت"
    },
    "examples": [
      {
        "word": "تاب",
        "roman": "tāb",
        "meaning": "swing",
        "highlight": "ت"
      },
      {
        "word": "بستم",
        "roman": "bastam",
        "meaning": "I tied",
        "highlight": "ت"
      },
      {
        "word": "توت",
        "roman": "toot",
        "meaning": "berry",
        "highlight": "ت"
      }
    ],
    "quiz": {
      "question": "swing (tāb)",
      "correct": "تـ",
      "wrong": "ثـ",
      "hint": "Te has 2 dots above!"
    }
  },
  {
    "level": 1,
    "letter": "ر",
    "name": "Re",
    "roman": "r",
    "forms": {
      "isolated": "ر",
      "initial": "ر",
      "medial": "ر",
      "final": "ر"
    },
    "examples": [
      {
        "word": "رام",
        "roman": "raam",
        "meaning": "tame",
        "highlight": "ر"
      },
      {
        "word": "سرما",
        "roman": "sarmā",
        "meaning": "cold",
        "highlight": "ر"
      },
      {
        "word": "مادر",
        "roman": "mādar",
        "meaning": "mother",
        "highlight": "ر"
      }
    ],
    "quiz": {
      "question": "cloud (abr)",
      "correct": "ر",
      "wrong": "ز",
      "hint": "Re curves like a wave, no dot!"
    }
  },
  {
    "level": 1,
    "letter": "ن",
    "name": "Nun",
    "roman": "n",
    "forms": {
      "isolated": "ن",
      "initial": "نـ",
      "medial": "نـ",
      "final": "ن"
    },
    "examples": [
      {
        "word": "نان",
        "roman": "nān",
        "meaning": "bread",
        "highlight": "ن"
      },
      {
        "word": "بند",
        "roman": "band",
        "meaning": "band",
        "highlight": "ن"
      },
      {
        "word": "آسمان",
        "roman": "āsemān",
        "meaning": "sky",
        "highlight": "ن"
      }
    ],
    "quiz": {
      "question": "bread (nān)",
      "correct": "نـ",
      "wrong": "بـ",
      "hint": "Nun has 1 dot above its bowl!"
    }
  },
  {
    "level": 1,
    "letter": "ی",
    "name": "Ye (ee)",
    "roman": "ee",
    "forms": {
      "isolated": "ی",
      "initial": "ایـ",
      "medial": "یـ",
      "final": "ی"
    },
    "examples": [
      {
        "word": "ایران",
        "roman": "irān",
        "meaning": "Iran",
        "highlight": "ی"
      },
      {
        "word": "بیدار",
        "roman": "bidaar",
        "meaning": "awake",
        "highlight": "ی"
      },
      {
        "word": "ابری",
        "roman": "abri",
        "meaning": "cloudy",
        "highlight": "ی"
      }
    ],
    "quiz": {
      "question": "apple (sib)",
      "correct": "یـ",
      "wrong": "بـ",
      "hint": "Ye curves under with 2 dots below!"
    }
  },
  {
    "level": 1,
    "letter": "ز",
    "name": "Ze",
    "roman": "z",
    "forms": {
      "isolated": "ز",
      "initial": "ز",
      "medial": "ز",
      "final": "ز"
    },
    "examples": [
      {
        "word": "زیبا",
        "roman": "zibā",
        "meaning": "beautiful",
        "highlight": "ز"
      },
      {
        "word": "آزاد",
        "roman": "āzād",
        "meaning": "free",
        "highlight": "ز"
      },
      {
        "word": "میز",
        "roman": "miz",
        "meaning": "table",
        "highlight": "ز"
      }
    ],
    "quiz": {
      "question": "earth (zamin)",
      "correct": "ز",
      "wrong": "ر",
      "hint": "Ze has a dot above!"
    }
  },
  {
    "level": 1,
    "letter": "ِ",
    "name": "Short e",
    "roman": "e",
    "forms": {
      "isolated": "ِ",
      "custom": [
        {
          "key": "c1",
          "form": "اِ",
          "label": "Alef + e",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "ـِـ",
          "label": "Middle e",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ه",
          "label": "Heh + e",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ـه",
          "label": "Heh (end)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "اِسم",
        "roman": "esm",
        "meaning": "name",
        "highlight": [
          "ا",
          "ِ"
        ]
      },
      {
        "word": "آرِزو",
        "roman": "ārezu",
        "meaning": "wish",
        "highlight": [
          "ر",
          "ِ"
        ]
      },
      {
        "word": "آزاده",
        "roman": "āzāde",
        "meaning": "free",
        "highlight": "ه"
      },
      {
        "word": "بوسه",
        "roman": "buse",
        "meaning": "kiss",
        "highlight": "ه"
      }
    ],
    "quiz": {
      "question": "name (esm)",
      "correct": "اِ",
      "wrong": "اَ",
      "hint": "Short e sits below the letter!"
    }
  },
  {
    "level": 1,
    "letter": "ش",
    "name": "Shin",
    "roman": "sh",
    "forms": {
      "isolated": "ش",
      "initial": "شـ",
      "medial": "شـ",
      "final": "ش"
    },
    "examples": [
      {
        "word": "شب",
        "roman": "shab",
        "meaning": "night",
        "highlight": "ش"
      },
      {
        "word": "تشنه",
        "roman": "teshne",
        "meaning": "thirsty",
        "highlight": "ش"
      },
      {
        "word": "آتش",
        "roman": "ātash",
        "meaning": "fire",
        "highlight": "ش"
      }
    ],
    "quiz": {
      "question": "night (shab)",
      "correct": "شـ",
      "wrong": "سـ",
      "hint": "Shin has 3 dots above!"
    }
  },
  {
    "level": 1,
    "letter": "ی",
    "name": "Ye (y)",
    "roman": "y",
    "forms": {
      "isolated": "ی",
      "initial": "یـ",
      "medial": "یـ",
      "final": "ی"
    },
    "examples": [
      {
        "word": "یاس",
        "roman": "yās",
        "meaning": "jasmine",
        "highlight": "ی"
      },
      {
        "word": "میمون",
        "roman": "meymoon",
        "meaning": "monkey",
        "highlight": "ی"
      },
      {
        "word": "بوی بد",
        "roman": "booye bad",
        "meaning": "bad smell",
        "highlight": "ی"
      }
    ],
    "quiz": {
      "question": "sea (daryā)",
      "correct": "یـ",
      "wrong": "بـ",
      "hint": "Ye as a consonant — y sound!"
    }
  },
  {
    "level": 1,
    "letter": "اُ  ـُـ",
    "name": "Short o",
    "roman": "o",
    "forms": {
      "isolated": "ُ",
      "custom": [
        {
          "key": "c1",
          "form": "اُ  ـُـ",
          "label": "Short o",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "ـُـ",
          "label": "Middle o",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ـُ",
          "label": "End o",
          "exIdx": 2
        }
      ]
    },
    "examples": [
      {
        "word": "اُمید",
        "roman": "omid",
        "meaning": "hope",
        "highlight": [
          "ا",
          "ُ"
        ]
      },
      {
        "word": "دُرُست",
        "roman": "dorost",
        "meaning": "correct",
        "highlight": [
          "د",
          "ر",
          "ُ"
        ]
      },
      {
        "word": "تُرمُز",
        "roman": "tormoz",
        "meaning": "brakes",
        "highlight": [
          "ت",
          "م",
          "ُ"
        ]
      }
    ],
    "quiz": {
      "question": "hope (omid)",
      "correct": "بُ",
      "wrong": "بَ",
      "hint": "Short o sits above the letter!"
    }
  },
  {
    "level": 1,
    "letter": "ک",
    "name": "Kaf",
    "roman": "k",
    "forms": {
      "isolated": "ک",
      "initial": "کـ",
      "medial": "کـ",
      "final": "ک"
    },
    "examples": [
      {
        "word": "کباب",
        "roman": "kabāb",
        "meaning": "kebab",
        "highlight": "ک"
      },
      {
        "word": "نمکدان",
        "roman": "namakdān",
        "meaning": "salt shaker",
        "highlight": "ک"
      },
      {
        "word": "کودک",
        "roman": "koodak",
        "meaning": "child",
        "highlight": "ک"
      }
    ],
    "quiz": {
      "question": "book (ketāb)",
      "correct": "کـ",
      "wrong": "گـ",
      "hint": "Kaf has a small diagonal line on top!"
    }
  },
  {
    "level": 1,
    "letter": "و",
    "name": "Vav (v)",
    "roman": "v",
    "forms": {
      "isolated": "و",
      "initial": "و",
      "medial": "و",
      "final": "و"
    },
    "examples": [
      {
        "word": "ورزش",
        "roman": "varzesh",
        "meaning": "sport",
        "highlight": "و"
      },
      {
        "word": "میوه",
        "roman": "mive",
        "meaning": "fruit",
        "highlight": "و"
      },
      {
        "word": "ناو",
        "roman": "naav",
        "meaning": "warship",
        "highlight": "و"
      }
    ],
    "quiz": {
      "question": "sport (varzesh)",
      "correct": "و",
      "wrong": "ب",
      "hint": "Vav can sound like v or oo!"
    }
  },
  {
    "level": 1,
    "letter": "پ",
    "name": "Pe",
    "roman": "p",
    "forms": {
      "isolated": "پ",
      "initial": "پـ",
      "medial": "پـ",
      "final": "پ"
    },
    "examples": [
      {
        "word": "پدر",
        "roman": "pedar",
        "meaning": "father",
        "highlight": "پ"
      },
      {
        "word": "شامپو",
        "roman": "shampoo",
        "meaning": "shampoo",
        "highlight": "پ"
      },
      {
        "word": "سوپ",
        "roman": "soup",
        "meaning": "soup",
        "highlight": "پ"
      }
    ],
    "quiz": {
      "question": "father (pedar)",
      "correct": "پـ",
      "wrong": "بـ",
      "hint": "Pe has 3 dots below!"
    }
  },
  {
    "level": 1,
    "letter": "گ",
    "name": "Gaf",
    "roman": "g",
    "forms": {
      "isolated": "گ",
      "initial": "گـ",
      "medial": "گـ",
      "final": "گ"
    },
    "examples": [
      {
        "word": "گوش",
        "roman": "goosh",
        "meaning": "ear",
        "highlight": "گ"
      },
      {
        "word": "انگور",
        "roman": "angoor",
        "meaning": "grapes",
        "highlight": "گ"
      },
      {
        "word": "گرگ",
        "roman": "gorg",
        "meaning": "wolf",
        "highlight": "گ"
      }
    ],
    "quiz": {
      "question": "ear (goosh)",
      "correct": "گـ",
      "wrong": "کـ",
      "hint": "Gaf has two strokes on top!"
    }
  },
  {
    "level": 1,
    "letter": "ف",
    "name": "Fe",
    "roman": "f",
    "forms": {
      "isolated": "ف",
      "custom": [
        {
          "key": "c1",
          "form": "فـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "فـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ف",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ف",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "فرد",
        "roman": "fard",
        "meaning": "individual",
        "highlight": "ف"
      },
      {
        "word": "کفش",
        "roman": "kafsh",
        "meaning": "shoe",
        "highlight": "ف"
      },
      {
        "word": "برف",
        "roman": "barf",
        "meaning": "snow",
        "highlight": "ف"
      },
      {
        "word": "کیف",
        "roman": "kif",
        "meaning": "bag",
        "highlight": "ف"
      }
    ],
    "quiz": {
      "question": "snow (barf)",
      "correct": "ـف",
      "wrong": "ـق",
      "hint": "Fe has 1 dot above the circle!"
    }
  },
  {
    "level": 1,
    "letter": "خ",
    "name": "Khe",
    "roman": "kh",
    "forms": {
      "isolated": "خ",
      "custom": [
        {
          "key": "c1",
          "form": "خـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "خـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "خ",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "خ",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "خدا",
        "roman": "khodā",
        "meaning": "God",
        "highlight": "خ"
      },
      {
        "word": "تخت",
        "roman": "takht",
        "meaning": "bed",
        "highlight": "خ"
      },
      {
        "word": "شاخ",
        "roman": "shākh",
        "meaning": "branch",
        "highlight": "خ"
      },
      {
        "word": "میخ",
        "roman": "mikh",
        "meaning": "nail",
        "highlight": "خ"
      }
    ],
    "quiz": {
      "question": "house (khāne)",
      "correct": "خـ",
      "wrong": "حـ",
      "hint": "Khe has 1 dot above!"
    }
  },
  {
    "level": 1,
    "letter": "ق",
    "name": "Qaf",
    "roman": "gh/q",
    "forms": {
      "isolated": "ق",
      "custom": [
        {
          "key": "c1",
          "form": "قـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "قـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ق",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ق",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "قد",
        "roman": "ghad",
        "meaning": "height",
        "highlight": "ق"
      },
      {
        "word": "نقشه",
        "roman": "naghshe",
        "meaning": "map",
        "highlight": "ق"
      },
      {
        "word": "اتاق",
        "roman": "otāgh",
        "meaning": "room",
        "highlight": "ق"
      },
      {
        "word": "تشویق",
        "roman": "tashviq",
        "meaning": "encouragement",
        "highlight": "ق"
      }
    ],
    "quiz": {
      "question": "room (otāgh)",
      "correct": "قـ",
      "wrong": "کـ",
      "hint": "Qaf has 2 dots above!"
    }
  },
  {
    "level": 1,
    "letter": "ل",
    "name": "Lam",
    "roman": "l",
    "forms": {
      "isolated": "ل",
      "custom": [
        {
          "key": "c1",
          "form": "لـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "لـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ل",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ل",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "لانه",
        "roman": "lāne",
        "meaning": "nest",
        "highlight": "ل"
      },
      {
        "word": "بلبل",
        "roman": "bolbol",
        "meaning": "nightingale",
        "highlight": "ل"
      },
      {
        "word": "بال",
        "roman": "bāl",
        "meaning": "wing",
        "highlight": "ل"
      },
      {
        "word": "گل",
        "roman": "gol",
        "meaning": "flower",
        "highlight": "ل"
      }
    ],
    "quiz": {
      "question": "flower (gol)",
      "correct": "لـ",
      "wrong": "نـ",
      "hint": "Lam sweeps up tall!"
    }
  },
  {
    "level": 1,
    "letter": "ج",
    "name": "Jim",
    "roman": "j",
    "forms": {
      "isolated": "ج",
      "custom": [
        {
          "key": "c1",
          "form": "جـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "جـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ج",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ج",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "جان",
        "roman": "jān",
        "meaning": "soul",
        "highlight": "ج"
      },
      {
        "word": "کجا",
        "roman": "kojā",
        "meaning": "where",
        "highlight": "ج"
      },
      {
        "word": "تاج",
        "roman": "tāj",
        "meaning": "crown",
        "highlight": "ج"
      },
      {
        "word": "کج",
        "roman": "kaj",
        "meaning": "crooked",
        "highlight": "ج"
      }
    ],
    "quiz": {
      "question": "celebration (jashn)",
      "correct": "جـ",
      "wrong": "چـ",
      "hint": "Jim has 1 dot below!"
    }
  },
  {
    "level": 1,
    "letter": "و",
    "name": "Vav (o) — exception",
    "roman": "o",
    "forms": {
      "isolated": "و",
      "custom": [
        {
          "key": "c1",
          "form": "و",
          "label": "Start",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "و",
          "label": "Middle",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "و",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "و",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "تو",
        "roman": "to",
        "meaning": "you",
        "highlight": "و"
      },
      {
        "word": "خوش",
        "roman": "khosh",
        "meaning": "happy",
        "highlight": "و"
      },
      {
        "word": "کادو",
        "roman": "kādo",
        "meaning": "gift",
        "highlight": "و"
      },
      {
        "word": "دوباره",
        "roman": "dobāre",
        "meaning": "again",
        "highlight": "و"
      }
    ],
    "quiz": {
      "question": "you (to)",
      "correct": "و",
      "wrong": "ب",
      "hint": "This و makes an 'o' sound — an exception!"
    }
  },
  {
    "level": 1,
    "letter": "ه",
    "name": "He",
    "roman": "h",
    "forms": {
      "isolated": "ه",
      "custom": [
        {
          "key": "c1",
          "form": "هـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "هـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ـه",
          "label": "Middle 2",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ه",
          "label": "End",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "هوا",
        "roman": "havā",
        "meaning": "air",
        "highlight": "ه"
      },
      {
        "word": "مهتاب",
        "roman": "mahtāb",
        "meaning": "moonlight",
        "highlight": "ه"
      },
      {
        "word": "هفته",
        "roman": "hafte",
        "meaning": "week",
        "highlight": "ه"
      },
      {
        "word": "ماه",
        "roman": "māh",
        "meaning": "moon",
        "highlight": "ه"
      }
    ],
    "quiz": {
      "question": "moon (māh)",
      "correct": "ـه",
      "wrong": "ـح",
      "hint": "He looks like a figure 8!"
    }
  },
  {
    "level": 1,
    "letter": "چ",
    "name": "Che",
    "roman": "ch",
    "forms": {
      "isolated": "چ",
      "custom": [
        {
          "key": "c1",
          "form": "چـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "چـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "چ",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "چ",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "چشم",
        "roman": "cheshm",
        "meaning": "eye",
        "highlight": "چ"
      },
      {
        "word": "بچه",
        "roman": "bache",
        "meaning": "child",
        "highlight": "چ"
      },
      {
        "word": "قارچ",
        "roman": "ghārch",
        "meaning": "mushroom",
        "highlight": "چ"
      },
      {
        "word": "مچ",
        "roman": "moch",
        "meaning": "wrist",
        "highlight": "چ"
      }
    ],
    "quiz": {
      "question": "eye (cheshm)",
      "correct": "چـ",
      "wrong": "جـ",
      "hint": "Che has 3 dots below!"
    }
  },
  {
    "level": 1,
    "letter": "ژ",
    "name": "Zhe",
    "roman": "zh",
    "forms": {
      "isolated": "ژ",
      "custom": [
        {
          "key": "c1",
          "form": "ژ",
          "label": "Start",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "ژ",
          "label": "Middle",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ژ",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ژ",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "ژاله",
        "roman": "jāle",
        "meaning": "hailstone",
        "highlight": "ژ"
      },
      {
        "word": "مژه",
        "roman": "mozhe",
        "meaning": "eyelash",
        "highlight": "ژ"
      },
      {
        "word": "ماساژ",
        "roman": "māsāzh",
        "meaning": "massage",
        "highlight": "ژ"
      },
      {
        "word": "انرژی",
        "roman": "anarzhi",
        "meaning": "energy",
        "highlight": "ژ"
      }
    ],
    "quiz": {
      "question": "jelly (zhele)",
      "correct": "ژ",
      "wrong": "ز",
      "hint": "Zhe has 3 dots above — like Shin but curves!"
    }
  },
  {
    "level": 1,
    "letter": "خوا",
    "name": "Khā (خوا)",
    "roman": "khā",
    "forms": {
      "isolated": "خوا",
      "custom": [
        {
          "key": "c1",
          "form": "خوا",
          "label": "Start",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "خوا",
          "label": "Middle",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "خوا",
          "label": "End",
          "exIdx": 2
        }
      ]
    },
    "examples": [
      {
        "word": "خواب",
        "roman": "khāb",
        "meaning": "sleep",
        "highlight": "خوا"
      },
      {
        "word": "استخوان",
        "roman": "ostokhan",
        "meaning": "bone",
        "highlight": "خوا"
      },
      {
        "word": "خواندن",
        "roman": "khāndan",
        "meaning": "to read",
        "highlight": "خوا"
      }
    ],
    "quiz": {
      "question": "sister (khāhar)",
      "correct": "خوا",
      "wrong": "خا",
      "hint": "خوا is always written but the و is silent — it sounds like 'khā'!"
    }
  },
  {
    "level": 1,
    "letter": "ص",
    "name": "Sad",
    "roman": "s",
    "forms": {
      "isolated": "ص",
      "custom": [
        {
          "key": "c1",
          "form": "صـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "صـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ص",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ص",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "صدا",
        "roman": "sedā",
        "meaning": "sound",
        "highlight": "ص"
      },
      {
        "word": "تصادف",
        "roman": "tasādof",
        "meaning": "accident",
        "highlight": "ص"
      },
      {
        "word": "رقص",
        "roman": "raghs",
        "meaning": "dance",
        "highlight": "ص"
      },
      {
        "word": "قرص",
        "roman": "ghors",
        "meaning": "pill",
        "highlight": "ص"
      }
    ],
    "quiz": {
      "question": "sound (sedā)",
      "correct": "صـ",
      "wrong": "سـ",
      "hint": "Sad has a bump with a tail — emphatic S!"
    }
  },
  {
    "level": 1,
    "letter": "ذ",
    "name": "Zal",
    "roman": "z",
    "forms": {
      "isolated": "ذ",
      "custom": [
        {
          "key": "c1",
          "form": "ذ",
          "label": "Start",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "ذ",
          "label": "Middle",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ذ",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ذ",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "ذرت",
        "roman": "zorat",
        "meaning": "corn",
        "highlight": "ذ"
      },
      {
        "word": "لذیذ",
        "roman": "laziz",
        "meaning": "delicious",
        "highlight": "ذ"
      },
      {
        "word": "گذشته",
        "roman": "gozashte",
        "meaning": "past",
        "highlight": "ذ"
      },
      {
        "word": "آذر",
        "roman": "āzar",
        "meaning": "Azar",
        "highlight": "ذ"
      }
    ],
    "quiz": {
      "question": "corn (zort)",
      "correct": "ذ",
      "wrong": "ز",
      "hint": "Zal has a dot above — like Dal but with a dot!"
    }
  },
  {
    "level": 1,
    "letter": "ع",
    "name": "'Ain",
    "roman": "à/e",
    "forms": {
      "isolated": "ع",
      "custom": [
        {
          "key": "c1",
          "form": "عـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "عـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ع",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ع",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "علی",
        "roman": "ali",
        "meaning": "Ali",
        "highlight": "ع"
      },
      {
        "word": "معلم",
        "roman": "mo'allem",
        "meaning": "teacher",
        "highlight": "ع"
      },
      {
        "word": "جامعه",
        "roman": "jāme'e",
        "meaning": "society",
        "highlight": "ع"
      },
      {
        "word": "شروع",
        "roman": "shorou'",
        "meaning": "start",
        "highlight": "ع"
      }
    ],
    "quiz": {
      "question": "teacher (mo'allem)",
      "correct": "عـ",
      "wrong": "غـ",
      "hint": "'Ain has no dots — deep throat sound!"
    }
  },
  {
    "level": 1,
    "letter": "ث",
    "name": "Se",
    "roman": "s",
    "forms": {
      "isolated": "ث",
      "custom": [
        {
          "key": "c1",
          "form": "ثـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "ثـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ث",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ث",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "ثریا",
        "roman": "sorayā",
        "meaning": "Soraya",
        "highlight": "ث"
      },
      {
        "word": "کثیف",
        "roman": "kasif",
        "meaning": "dirty",
        "highlight": "ث"
      },
      {
        "word": "مثلث",
        "roman": "mosalas",
        "meaning": "triangle",
        "highlight": "ث"
      },
      {
        "word": "ارث",
        "roman": "ers",
        "meaning": "inheritance",
        "highlight": "ث"
      }
    ],
    "quiz": {
      "question": "triangle (mosalas)",
      "correct": "ثـ",
      "wrong": "سـ",
      "hint": "Se has 3 dots above — like Te but one more dot!"
    }
  },
  {
    "level": 1,
    "letter": "ح",
    "name": "He (ḥ)",
    "roman": "h",
    "forms": {
      "isolated": "ح",
      "custom": [
        {
          "key": "c1",
          "form": "حـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "حـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ح",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ح",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "حیوان",
        "roman": "heyvan",
        "meaning": "animal",
        "highlight": "ح"
      },
      {
        "word": "محبت",
        "roman": "mohabbat",
        "meaning": "love",
        "highlight": "ح"
      },
      {
        "word": "صبح",
        "roman": "sobh",
        "meaning": "morning",
        "highlight": "ح"
      },
      {
        "word": "روح",
        "roman": "rooh",
        "meaning": "spirit",
        "highlight": "ح"
      }
    ],
    "quiz": {
      "question": "morning (sobh)",
      "correct": "حـ",
      "wrong": "هـ",
      "hint": "He (ḥ) has no dots — deep breathy H!"
    }
  },
  {
    "level": 1,
    "letter": "ض",
    "name": "Zad",
    "roman": "z",
    "forms": {
      "isolated": "ض",
      "custom": [
        {
          "key": "c1",
          "form": "ضـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "ضـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ض",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ض",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "ضربه",
        "roman": "zarbe",
        "meaning": "hit",
        "highlight": "ض"
      },
      {
        "word": "راضی",
        "roman": "rāzi",
        "meaning": "satisfied",
        "highlight": "ض"
      },
      {
        "word": "مریض",
        "roman": "mariz",
        "meaning": "sick",
        "highlight": "ض"
      },
      {
        "word": "عوض",
        "roman": "avaz",
        "meaning": "instead",
        "highlight": "ض"
      }
    ],
    "quiz": {
      "question": "sick (mariz)",
      "correct": "ضـ",
      "wrong": "صـ",
      "hint": "Zad has a dot above — emphatic Z!"
    }
  },
  {
    "level": 1,
    "letter": "ط",
    "name": "Ta (emphatic)",
    "roman": "t",
    "forms": {
      "isolated": "ط",
      "initial": "طـ",
      "medial": "طـ",
      "final": "ط"
    },
    "examples": [
      {
        "word": "طوطی",
        "roman": "tooti",
        "meaning": "parrot",
        "highlight": "ط"
      },
      {
        "word": "خطر",
        "roman": "khatar",
        "meaning": "danger",
        "highlight": "ط"
      },
      {
        "word": "حیاط",
        "roman": "hayāt",
        "meaning": "backyard",
        "highlight": "ط"
      }
    ],
    "quiz": {
      "question": "parrot (tuti)",
      "correct": "طـ",
      "wrong": "تـ",
      "hint": "Ta is emphatic T — has a vertical stroke in a bowl!"
    }
  },
  {
    "level": 1,
    "letter": "غ",
    "name": "Ghain",
    "roman": "gh",
    "forms": {
      "isolated": "غ",
      "custom": [
        {
          "key": "c1",
          "form": "غـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "غـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "غ",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "غ",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "غاز",
        "roman": "ghāz",
        "meaning": "goose",
        "highlight": "غ"
      },
      {
        "word": "جغد",
        "roman": "joghd",
        "meaning": "owl",
        "highlight": "غ"
      },
      {
        "word": "تیغ",
        "roman": "tigh",
        "meaning": "blade",
        "highlight": "غ"
      },
      {
        "word": "مرغ",
        "roman": "morgh",
        "meaning": "chicken",
        "highlight": "غ"
      }
    ],
    "quiz": {
      "question": "garden (bāgh)",
      "correct": "غـ",
      "wrong": "عـ",
      "hint": "Ghain has 1 dot above — like 'Ain with a dot!"
    }
  },
  {
    "level": 1,
    "letter": "ظ",
    "name": "Za (emphatic)",
    "roman": "z",
    "forms": {
      "isolated": "ظ",
      "custom": [
        {
          "key": "c1",
          "form": "ظـ",
          "label": "Initial",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "ظـ",
          "label": "Medial",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "ظ",
          "label": "End (1)",
          "exIdx": 2
        },
        {
          "key": "c4",
          "form": "ظ",
          "label": "End (2)",
          "exIdx": 3
        }
      ]
    },
    "examples": [
      {
        "word": "ظرف",
        "roman": "zarf",
        "meaning": "dish",
        "highlight": "ظ"
      },
      {
        "word": "نظم",
        "roman": "nazm",
        "meaning": "order",
        "highlight": "ظ"
      },
      {
        "word": "خداحافظ",
        "roman": "khodahafez",
        "meaning": "goodbye",
        "highlight": "ظ"
      },
      {
        "word": "غلیظ",
        "roman": "ghaliz",
        "meaning": "thick",
        "highlight": "ظ"
      }
    ],
    "quiz": {
      "question": "order (nazm)",
      "correct": "ظـ",
      "wrong": "زـ",
      "hint": "Za emphatic — like Ta but with a dot on top!"
    }
  },
  {
    "level": 1,
    "letter": "ّ",
    "name": "Shadda (تشدید)",
    "roman": "double consonant",
    "forms": {
      "isolated": "ّ",
      "custom": [
        {
          "key": "c1",
          "form": "وّ",
          "label": "Example 1",
          "exIdx": 0
        },
        {
          "key": "c2",
          "form": "دّ",
          "label": "Example 2",
          "exIdx": 1
        },
        {
          "key": "c3",
          "form": "چّ",
          "label": "Example 3",
          "exIdx": 2
        }
      ]
    },
    "examples": [
      {
        "word": "اوّل",
        "roman": "avval",
        "meaning": "first",
        "highlight": "ّ"
      },
      {
        "word": "شدّت",
        "roman": "shiddat",
        "meaning": "intensity",
        "highlight": "ّ"
      },
      {
        "word": "بچّه",
        "roman": "bachche",
        "meaning": "child",
        "highlight": "ّ"
      }
    ],
    "quiz": {
      "question": "first (avval)",
      "correct": "ّ",
      "wrong": "ا",
      "hint": "Shadda (ّ) doubles the consonant — اوّل sounds like av-val!"
    }
  }
]
