function Options(options) {
    options = options || {};

    this.center = options.center || [119.36334892304187, 36.55804895201371];
    this.altitude = options.altitude || 527395.7046564185;
    this.serverUrl = options.serverUrl || 'http://127.0.0.1:8099';

    this.bingMapKey = options.bingMapKey || 'Amvk_1DmXPpb7VB7JIXtWHBIpXdK8ABDN7E2xiK8olFovcy5KcVjVfpsW8rxoeVZ';
    this.bingMapServerUrl = options.bingMapServerUrl || 'https://dev.virtualearth.net';
};

export { Options };