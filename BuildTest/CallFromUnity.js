function CallFromU(parametr) {
    parametr = parametr.toString();

    if (parametr == "ShowInterstitialAds") {
        //window.ShowInterstitialAds();
    }
    else if (parametr == "FirstMoveCardInTutorial") {
        window.SendStatisticsEvent("funnel_first_move_card_in_tutorial", {});
    }
    else if (parametr == "funnel_first_launch") {
        window.SendStatisticsEvent("funnel_first_launch", {});
    }
    else if (parametr == "FirstTutorialTimerOver") {
        window.SendStatisticsEvent("first_tutorial_timer_over", {});
    }
    else if (parametr == "SecondTutorialTimerOver") {
        window.SendStatisticsEvent("second_tutorial_timer_over", {});
    }
    else if (parametr == "TutorialFirstCardInFoundation") {
        window.SendStatisticsEvent("tutorial_first_card_in_foundation", {});
    }
    else if (parametr == "TutorialLastCardInFoundation") {
        window.SendStatisticsEvent("tutorial_last_card_in_foundation", {});
    }
    else if (parametr == "SetPause" && window.ysdk != undefined && window.ysdk != null) {
        window.ysdk.features.GameplayAPI.stop();
        console.log("✉ Call SetPause: GameplayAPI.stop()");
    }
    else if (parametr == "SetNotPause" && window.ysdk != undefined && window.ysdk != null) {
        window.ysdk.features.GameplayAPI.start();
        console.log("✉ Call SetNotPause: GameplayAPI.start()");
    }
    else if (parametr == "GameStarted" && window.ysdk != undefined && window.ysdk != null) {
        window.ysdk.features.GameplayAPI.start();
        console.log("✉ GameStarted: Call GameplayAPI.start()");
    }
    else if (parametr == "GameEnded" && window.lastStartedTournamentType != "t0" && window.ysdk != undefined && window.ysdk != null) {
        window.ysdk.features.GameplayAPI.stop();
        console.log("✉ GameEnded: Call GameplayAPI.stop()");
        setTimeout(function () {
            window.ysdk.features.GameplayAPI.stop();
            console.log("✉ GameEnded: Call GameplayAPI.stop()");
        }, 100);
    }
}

function CallFromU_BuildLoadingEnded() {
    window.SendStatisticsEvent("time_loading_unity_3", {
        time_loading_unity_3: ((Date.now() - Number(window.startUnityLoadingTime)))
    });

    console.log("time_loading_unity_3: " + ((Date.now() - Number(window.startUnityLoadingTime))));

    if (window.ysdk != null || window.ysdk != undefined) {
        setTimeout(function () {
            window.ysdk.features.LoadingAPI?.ready();
            window.ysdk.features.GameplayAPI.stop();
        }, 200);
    }
}

function FirstTutorialStartedCallFromU() {
    if (localStorage.getItem("funnel_first_tutor_started_WAS_SENT") != "true") {
        localStorage.setItem("funnel_first_tutor_started_WAS_SENT", "true");
        window.SendStatisticsEvent("funnel_tutor_button_clicked", { "event_funnel_complete": "funnel_tutor_button_clicked" });
    }
}

function SendStatisticsFirstTutorialEndedFromU() {
    if (localStorage.getItem("funnel_tutor_complete_1_WAS_SENT") != "true") {
        localStorage.setItem("funnel_tutor_complete_1_WAS_SENT", "true");
        window.SendStatisticsEvent("funnel_tutor_complete_1", { "event_funnel_complete": "funnel_tutor_complete_1" });
    }
}

function SendStatisticsSecondTutorialEndedFromU(playerPrize, playerPlace) {
    if (window.ysdk != undefined && window.ysdk != null) {
        window.ysdk.features.GameplayAPI.stop();
        console.log("✉ Call SetPause: GameplayAPI.stop()");
        setTimeout(function () {
            window.ysdk.features.GameplayAPI.stop();
            console.log("✉ GameEnded: Call GameplayAPI.stop()");
        }, 100);
    }

    if (localStorage.getItem("funnel_tutor_complete_2_WAS_SENT") != "true") {
        localStorage.setItem("funnel_tutor_complete_2_WAS_SENT", "true");
        window.SendStatisticsEvent("funnel_tutor_complete_2", { "event_funnel_complete": "funnel_tutor_complete_2" });
    }
}

function SendStatisticsTournamentStartedFromU(tournamentType) {
    tournamentType = tournamentType.toString();

    if (tournamentType == "t0") {
        return;
    }

    window.SendStatisticsEvent("match_started", { "tournament_type": tournamentType });

    if (window.isThisTutorial_forStatistics_matchCounter == undefined || window.isThisTutorial_forStatistics_matchCounter == null)
        window.isThisTutorial_forStatistics_matchCounter = 1;
    else
        window.isThisTutorial_forStatistics_matchCounter += 1;

    if (window.isThisTutorial_forStatistics_matchCounter == 1) {

        if (localStorage.getItem("funnel_first_match_start_WAS_SENT") != "true") {
            localStorage.setItem("funnel_first_match_start_WAS_SENT", "true");
            window.SendStatisticsEvent("funnel_first_match_start", {
                "event_funnel_complete": "funnel_first_match_start",
                "tournament_type": tournamentType
            });
        }
    }
    else if (window.isThisTutorial_forStatistics_matchCounter == 2) {
        if (localStorage.getItem("funnel_second_match_start_WAS_SENT") != "true") {
            localStorage.setItem("funnel_second_match_start_WAS_SENT", "true");
            window.SendStatisticsEvent("funnel_second_match_start", {
                "event_funnel_complete": "funnel_second_match_start",
                "tournament_type": tournamentType
            });
        }
    }
    else if (window.isThisTutorial_forStatistics_matchCounter == 5) {
        if (localStorage.getItem("funnel_match_five_started_WAS_SENT") != "true") {
            localStorage.setItem("funnel_match_five_started_WAS_SENT", "true");
            window.SendStatisticsEvent("funnel_match_five_started", {
                "event_funnel_complete": "funnel_match_five_started",
                "tournament_type": tournamentType
            });
        }
    }
}

function SendStatisticsMatchEndedFromU(tournamentType, baseScore, time, bonusScore, autoScore) {
    /*
    if (window.isThisTutorial_forStatistics == true &&
        window.isThisTutorial_forStatistics_matchCounter == 1) {
        window.waitForUILoadingAfterFirstMatchAfterLoading = true;
    }
        */

    tournamentType = tournamentType.toString();
    baseScore = baseScore.toString();
    time = time.toString();
    bonusScore = bonusScore.toString();
    autoScore = autoScore.toString();
    window.SendStatisticsEvent("match_ended", {
        "tournament_type": tournamentType,
        "baseScore": baseScore,
        "time_before_end_seconds": time,
        "bonus_score": bonusScore,
        "auto_score": autoScore
    });
}

