"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const invariant_1 = require("invariant");
const { RNZoomUs } = react_native_1.NativeModules;
if (!RNZoomUs)
    console.error('RNZoomUs native module is not linked.');
const DEFAULT_USER_TYPE = 2;
async function initialize(params, settings = {
    // more details inside: https://github.com/mieszko4/react-native-zoom-us/issues/28
    disableShowVideoPreviewWhenJoinMeeting: true,
}) {
    invariant_1(typeof params === 'object', 'ZoomUs.initialize expects object param. Consider to check migration docs. ' +
        'Check Link: https://github.com/mieszko4/react-native-zoom-us/blob/master/docs/UPGRADING.md');
    invariant_1(params.clientKey, 'ZoomUs.initialize requires clientKey');
    invariant_1(params.clientSecret, 'ZoomUs.initialize requires clientSecret');
    if (!params.domain)
        params.domain = 'zoom.us';
    return RNZoomUs.initialize(params, settings);
}
async function joinMeeting(params) {
    let { meetingNumber, noAudio = false, noVideo = false } = params;
    invariant_1(meetingNumber, 'ZoomUs.joinMeeting requires meetingNumber');
    if (typeof meetingNumber !== 'string')
        meetingNumber = meetingNumber.toString();
    // without noAudio, noVideo fields SDK can stack on joining meeting room for release build
    return RNZoomUs.joinMeeting({
        ...params,
        meetingNumber,
        noAudio: !!noAudio,
        noVideo: !!noVideo,
    });
}
async function joinMeetingWithPassword(...params) {
    console.warn("ZoomUs.joinMeetingWithPassword is deprecated. Use joinMeeting({ password: 'xxx', ... })");
    return RNZoomUs.joinMeetingWithPassword(...params);
}
async function startMeeting(params) {
    let { userType = DEFAULT_USER_TYPE, meetingNumber } = params;
    invariant_1(meetingNumber, 'ZoomUs.startMeeting requires meetingNumber');
    if (typeof meetingNumber !== 'string')
        meetingNumber = meetingNumber.toString();
    return RNZoomUs.startMeeting({ userType, ...params, meetingNumber });
}
exports.default = {
    initialize,
    joinMeeting,
    joinMeetingWithPassword,
    startMeeting,
};
