



function GenTweet() {

    this.nightTime = null;
    this.morningLight = null;
    this.eveningLight = null;
}


//-------------------------------------------------------------------------------------------
//  MAIN
//-------------------------------------------------------------------------------------------



GenTweet.prototype.generateTweet = function() {

    tombola.weightedFunction([this.TweetMessages, this.TweetJourney, this.TweetObservation, this.TweetToday, this.TweetTalk], [3, 2, 1.5, 1.5, 0.5]);

};


//-------------------------------------------------------------------------------------------
//  TALK
//-------------------------------------------------------------------------------------------


GenTweet.prototype.TweetTalk = function() {
    var string = "";

    var order = tombola.percent(50);
    var specify = tombola.percent(50);
    var style = tombola.range(0, 2);
    var preframe = tombola.percent(50);
    var me = tombola.percent(20);
    var multiple = tombola.percent(20);

    if (preframe) {
        string += tombola.item(lexicon.LexTalk.frame) + " ";
    }
    if (me) {
        string += tombola.item(lexicon.LexTalk.me) + " ";
    } else {
        var people = new tombola.deck(['michael', 'sara']);
        string += lexicon.LexTalk.who[people.draw()][style] + " ";

        if (multiple) {
            if (tombola.percent(70)) {
                string += "and " + lexicon.LexTalk.who[people.draw()][style] + " ";
            } else {
                string += "and myself ";
            }
            string += tombola.item(lexicon.LexTalk.multiple) + " ";
        } else {
            string += tombola.item(lexicon.LexTalk.single) + " ";
        }
    }

    string += tombola.item(lexicon.LexTalk.doing) + " ";
    string += tombola.item(lexicon.LexTalk.talk) + " ";

    if (order) {
        string += "at " + tombola.item(lexicon.LexTalk.at) + " ";
    }

    string += "on ";
    if (tombola.percent(30) || !specify) {
        string += tombola.item(lexicon.LexTalk.our) + " ";
    }
    if (specify) {
        string += tombola.item(lexicon.LexTalk.on.a) + " ";
    }
    string += tombola.item(lexicon.LexTalk.on.b);

    if (!order) {
        string += " at " + tombola.item(lexicon.LexTalk.at);
    }
    if (!preframe) {
        string += " " + tombola.item(lexicon.LexTalk.frame);
    }

    this.conclude(string);
};


//-------------------------------------------------------------------------------------------
//  OBSERVATIONS
//-------------------------------------------------------------------------------------------

GenTweet.prototype.TweetObservation = function() {

    var functions = [this.MessageSighting];
    var weights = [1];

    if (this.nightTime) {
        functions.push(this.MessageSky);
        weights.push(0.5);
    }
    if (this.morningLight || this.eveningLight) {
        functions.push(this.MessageLight);
        weights.push(0.5);
    }

    tombola.weightedItem(functions, weights);
};


GenTweet.prototype.MessageLight = function() {
    var string = "";
    var plural = tombola.weightedItem(['single', 'plural'], [1, 0.8]);
    var and = tombola.percent(35);
    var order = tombola.percent(50);
    var style = tombola.percent(60);
    var pre = tombola.percent(50);
    var time;

    if (this.morningLight) {
        time = 'early';
    } else {
        time = 'late';
    }

    if (order) {
        if (style) {
            string += tombola.item(['this', 'the']) + " ";
            string += tombola.item(lexicon.LexObservation.light[time].type) + " ";
            string += tombola.item(lexicon.LexObservation.light[time].light) + " makes ";
        } else {
            string += tombola.item(['in this', 'in the']) + " ";
            string += tombola.item(lexicon.LexObservation.light[time].type) + " ";
            string += tombola.item(lexicon.LexObservation.light[time].light) + ", ";
        }
    }
    string += tombola.item(lexicon.LexObservation.light[plural].thing) + " ";
    if (style && order) {
        string += tombola.item(lexicon.LexObservation.light.plural.looks) + " ";
    } else {
        string += tombola.item(lexicon.LexObservation.light[plural].looks) + " ";
    }

    if (pre || !and) {
        string += tombola.item(lexicon.LexObservation.light.pre) + " ";
    }

    if (and) {
        if (tombola.percent(75) || !pre) {
            string += tombola.item(lexicon.LexObservation.light.property) + " ";
        }
        string += "and " + tombola.item(lexicon.LexObservation.light.and);
    } else {
        string += tombola.item(lexicon.LexObservation.light.property);
        if (order && tombola.percent(35)) {
            string += " in color";
        }
    }

    if (!order) {
        string += " " + tombola.item(['in this', 'in the']) + " ";
        string += tombola.item(lexicon.LexObservation.light[time].type) + " ";
        string += tombola.item(lexicon.LexObservation.light[time].light);
    }

    this.conclude(string);
};

GenTweet.prototype.MessageSighting = function() {
    var string = "";
    var just = tombola.percent(40);
    var thing = tombola.weightedItem(['eagle', 'fox', 'llama', 'flamingo', 'geese', 'owl', 'lizard', 'chinchilla', 'puma', 'dust'], [1, 1, 1, 1, 0.7, 0.8, 0.07, 0.05, 0.05, 1]);
    var order = tombola.percent(55);

    // Just saw first //
    if (just) {
        string += tombola.item(lexicon.LexObservation.sighting.just) + " ";
    } else {
        // Time frame first //
        if (order) {
            string += tombola.item(lexicon.LexObservation.sighting.frame) + " ";
        }
        string += tombola.item(lexicon.LexObservation.sighting.saw) + " ";
    }
    string += tombola.item(lexicon.LexObservation.sighting.thing[thing].thing) + " ";
    string += tombola.item(lexicon.LexObservation.sighting.thing[thing].action) + " ";
    string += tombola.item(lexicon.LexObservation.sighting.place);

    // Time frame last //
    if (!order && !just) {
        string += " " + tombola.item(lexicon.LexObservation.sighting.frame);
    }

    this.conclude(string);
};


GenTweet.prototype.MessageSky = function() {
    var string = "";
    var plural = tombola.weightedItem(['single', 'plural'], [1, 1]);
    var order = tombola.percent(55);

    // sky first //
    if (order) {
        if (tombola.percent(40)) {
            string += tombola.item(lexicon.LexObservation.sky.pre) + " ";
        }
        string += tombola.item(lexicon.LexObservation.sky.looking) + " the ";
        string += tombola.item(lexicon.LexObservation.sky.type) + " ";
        string += tombola.item(lexicon.LexObservation.sky.sky) + ", ";
    }
    string += tombola.item(lexicon.LexObservation.sky[plural].object) + " ";
    string += tombola.item(lexicon.LexObservation.sky[plural].seems) + " ";
    string += tombola.item(lexicon.LexObservation.sky.appears);

    // sky last //
    if (!order) {
        string += " " + tombola.item(lexicon.LexObservation.sky.pre) + " ";
        string += tombola.item(lexicon.LexObservation.sky.looking) + " the ";
        string += tombola.item(lexicon.LexObservation.sky.type) + " ";
        string += tombola.item(lexicon.LexObservation.sky.sky);
    }

    this.conclude(string);
};


//-------------------------------------------------------------------------------------------
//  THE MESSAGES
//-------------------------------------------------------------------------------------------

GenTweet.prototype.TweetMessages = function() {
    tombola.weightedFunction([this.MessageQuality, this.MessageVoices, this.MessagePeaks, this.MessageUpdate], [10, 1, 3, 1.5]);
};

GenTweet.prototype.MessageUpdate = function() {
    var string = "";
    var complete = tombola.range(1, 4);
    var broken = tombola.range(0, 1);
    var poss = tombola.range(0, 3);

    if (broken === 0 && poss === 0) {
        complete = tombola.range(2, 4);
    }

    if (tombola.percent(70)) {
        string += "update" + tombola.item([': ', ' - ']);
    }
    string += tombola.item(lexicon.LexMessages.update.in) + " ";
    string += tombola.item(lexicon.LexMessages.update.frame) + " we've received ";
    string += lexicon.LexMessages.update.number[complete - 1] + " ";
    string += tombola.item(lexicon.LexMessages.update.confirmed) + " ";
    string += tombola.item(lexicon.LexMessages.update.messages);
    if (complete > 1) {
        string += "s";
    }
    if (broken > 0 && poss > 0) {
        string += ", ";
    } else {
        if (broken > 0 || poss > 0) {
            string += " and ";
        }
    }
    if (broken) {
        string += lexicon.LexMessages.update.number[broken - 1] + " ";
        string += tombola.item(lexicon.LexMessages.update.truncated);
        if (broken > 1) {
            string += "s";
        }
        if (poss > 0) {
            string += " and ";
        }
    }
    if (poss) {
        string += lexicon.LexMessages.update.number[poss - 1] + " ";
        if (tombola.percent(50)) {
            string += "more ";
        }
        string += tombola.item(lexicon.LexMessages.update.unconfirmed);
    }

    this.conclude(string);
};

GenTweet.prototype.MessageVoices = function() {
    var string = "";
    var preframe = tombola.percent(60);
    var prestudy = tombola.percent(65);

    // Time frame first //
    if (preframe) {
        string += tombola.item(lexicon.LexMessages.voices.frame) + " ";
    }
    // Studying first/second //
    if (prestudy) {
        string += tombola.item(lexicon.LexMessages.voices.study) + ", ";
    }
    // Time frame second //
    if (!preframe) {
        string += tombola.item(lexicon.LexMessages.voices.frame) + " ";
    }
    string += tombola.item(lexicon.LexMessages.voices.think) + " ";
    string += tombola.item(lexicon.LexMessages.voices.hear) + " ";
    string += tombola.item(lexicon.LexMessages.voices.type) + " ";
    string += tombola.item(lexicon.LexMessages.voices.sound);

    // additional context //
    if (tombola.percent(10)) {
        string += " " + tombola.item(lexicon.LexMessages.voices.noise);
    }
    // Time frame last //
    if (!prestudy) {
        string += " " + tombola.item(lexicon.LexMessages.voices.study);
    }

    this.conclude(string);
};


GenTweet.prototype.MessagePeaks = function() {
    var string = "";

    // optional intro //
    if (tombola.percent(35)) {
        string += tombola.item(lexicon.LexMessages.peaks.intro) + " ";
    }

    string += tombola.item(lexicon.LexMessages.peaks.type) + " ";
    string += tombola.item(lexicon.LexMessages.peaks.messages) + " ";
    string += tombola.item(lexicon.LexMessages.peaks.display) + " ";

    // if freq peaks //
    if (tombola.percent(55)) {
        var htz = tombola.rangeArray(600, 2400, 3);

        // additional description //
        if (tombola.percent(70)) {
            string += tombola.item(lexicon.LexMessages.peaks.display2) + " "
        }

        // 1 freq //
        string += tombola.item(lexicon.LexMessages.peaks.frequency) + tombola.item([' at ', ' at around ']) + (htz[0] / 100) + tombola.item(['Hz', 'kHz']);

        // more than 1 freq //
        if (tombola.percent(50)) {

            // 3 freqs //
            if (tombola.percent(40)) {
                string += ", " + (htz[1] / 100) + tombola.item(['Hz', 'kHz']);
                string += " and " + (htz[2] / 100) + tombola.item(['Hz', 'kHz']);
            }
            // 2 freqs //
            else {
                string += " and " + (htz[1] / 100) + tombola.item(['Hz', 'kHz']);
            }
        }
    }
    // or some property other than peaks //
    else {
        string += tombola.item(lexicon.LexMessages.peaks.bridge) + " ";
        string += tombola.item(lexicon.LexMessages.peaks.property);
    }

    this.conclude(string);
};


GenTweet.prototype.MessageQuality = function() {
    var string = "";
    var preframe = tombola.percent(60);
    var order = tombola.percent(70);
    var intro = tombola.percent(40);

    if (order) {

        // optional intro //
        if (intro) {
            string += tombola.item(lexicon.LexMessages.quality.intro) + " ";
        }

        // message //
        string += tombola.item(lexicon.LexMessages.quality.quantity) + " of ";
        if (preframe) {
            string += tombola.item(lexicon.LexMessages.quality.preframe) + " ";
        } else {
            string += "the ";
        }
        string += tombola.item(lexicon.LexMessages.quality.messages) + " ";
        if (!preframe) {
            string += tombola.item(lexicon.LexMessages.quality.postframe) + " ";
        }

        // displays //
        string += tombola.item(lexicon.LexMessages.quality.display.a) + " ";

        // Michael's descriptions... //
        if (!intro && tombola.percent(45)) {
            string += tombola.item(lexicon.LexMessages.quality.michael.a) + ' "';
            string += tombola.item(lexicon.LexMessages.quality.michael.b) + " ";
            string += tombola.item(lexicon.LexMessages.quality.michael.c) + '"';
        }
        else {
            string += tombola.item(lexicon.LexMessages.quality.display.b) + " ";
            string += tombola.item(lexicon.LexMessages.quality.display.c);
        }


    } else {

        string += tombola.item(lexicon.LexMessages.quality.display.d) + " ";
        string += tombola.item(lexicon.LexMessages.quality.display.b) + " ";
        string += tombola.item(lexicon.LexMessages.quality.display.c) + " in ";
        string += tombola.item(lexicon.LexMessages.quality.quantity) + " of ";
        if (preframe) {
            string += tombola.item(lexicon.LexMessages.quality.preframe) + " ";
        } else {
            string += "the ";
        }
        string += tombola.item(lexicon.LexMessages.quality.messages);
        if (!preframe) {
            string += " " + tombola.item(lexicon.LexMessages.quality.postframe);
        }
    }

    this.conclude(string);
};


//-------------------------------------------------------------------------------------------
//  THE DAY / GENERAL
//-------------------------------------------------------------------------------------------


GenTweet.prototype.TweetToday = function() {
    var string = "";

    var DECK = new tombola.deck(['a', 'b', 'c', 'd', 'e']);
    var time = tombola.percent(75);
    var timePos = tombola.weightedNumber([3, 1, 4]);
    var comment = tombola.percent(55);
    var commentType = tombola.weightedItem(['message'], [1]);
    var subComment = tombola.percent(45);


    if (time && timePos === 1) {
        string += "" + tombola.item(lexicon.LexToday.time) + " ";
    }
    var obs = tombola.item(lexicon.LexToday.observation);
    string += "" + obs + " ";
    if (time && timePos === 2) {
        string += "" + tombola.item(lexicon.LexToday.time) + " ";
    }
    string += "" + tombola.item(lexicon.LexToday.method) + " ";
    string += "" + tombola.item(lexicon.LexToday.description[DECK.draw()]);

    // second description //
    if (!subComment && tombola.percent(25) && obs.length < 19) {
        string += tombola.weightedItem([' and ', ' & ', '/', ', and also ', ', ', ', but also ', ', and I guess '], [1, 1, 0.5, 1, 0.5, 1, 1]);
        string += "" + tombola.item(lexicon.LexToday.description[DECK.draw()]);
    }

    if (time && timePos === 3) {
        string += " " + tombola.item(lexicon.LexToday.time);
    }

    if (comment) {
        // pause grammar //
        string += ". ";

        if (subComment && lexicon.LexToday.comment[commentType].pre) {
            // sub comment //
            string += tombola.item(lexicon.LexToday.comment[commentType].pre.a) + " ";
            string += tombola.item(lexicon.LexToday.comment[commentType].pre.b) + " ";
            string += tombola.item(lexicon.LexToday.comment[commentType].pre.c) + ". ";
        }

        // comment //
        string += tombola.item(lexicon.LexToday.comment[commentType].a) + " ";
        string += tombola.item(lexicon.LexToday.comment[commentType].b);
    }

    this.conclude(string);
};


//-------------------------------------------------------------------------------------------
//  A JOURNEY
//-------------------------------------------------------------------------------------------

GenTweet.prototype.TweetJourney = function() {
    var string = "";

    var tense = tombola.weightedItem(['past', 'present', 'future'], [6, 1, 3]);
    var order = tombola.weightedNumber([2, 1]);
    var context = tombola.percent(70);
    var destination = tombola.weightedItem(['volcanic', 'salt', 'water', 'rocky', 'urban', 'hills', 'geyser', 'lava', 'life', 'abandoned', 'mines', 'observatory'], [25, 17, 17, 12, 10, 10, 6, 6, 6, 3, 3, 3]);
    var comment = tombola.percent(98);
    var commentType = tombola.weightedItem(['witness', 'observation', 'area', 'feeling', 'thinking', 'learned'], [tense == 'past', 1, 1, 0.3, (tense !== 'past') * 0.2, tense == 'past']);

    // pre context //
    if (order === 1 && context) {
        string += "" + tombola.item(lexicon.LexTravel.travel[tense].context) + " " + lexicon.LexTravel.travel[tense].reference + " ";
    } else {
        if (tombola.percent(60)) {
            string += "" + lexicon.LexTravel.travel[tense].reference + " ";
        }
    }

    // travel //
    string += "" + tombola.item(lexicon.LexTravel.travel[tense].travel) + " ";

    // place //
    string += "" + tombola.item(lexicon.LexTravel.places[destination]);

    // post context //
    if (order === 2 && context) {
        string += " " + tombola.item(lexicon.LexTravel.travel[tense].context);
    }

    if (comment || !context) {
        // pause grammar //
        string += tombola.weightedItem(['. ', ', ', ' - '], [5, 3, 1]);

        // comment //
        string += tombola.item(lexicon.LexTravel.comment[commentType].a) + " ";
        string += tombola.item(lexicon.LexTravel.comment[commentType].b);
    }

    this.conclude(string);
};

//-------------------------------------------------------------------------------------------
//  UTIL
//-------------------------------------------------------------------------------------------

GenTweet.prototype.conclude = function(string) {
    string += ".";
    string = this.capitalize(string);
    console.log(string);
    //console.log(string.length);

};

GenTweet.prototype.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};



module.exports = GenTweet;