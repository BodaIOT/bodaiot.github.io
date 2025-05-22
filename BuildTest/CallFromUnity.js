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