import DeviceDetector from 'device-detector-js';

const getDeviceInfo = (userAgent: string) => {
    const dd = new DeviceDetector();
    const parsed = dd.parse(userAgent || '');
    return {
        client: parsed.client ?? {},
        os: parsed.os ?? {},
        device: parsed.device ?? {},
        bot: parsed.bot ?? null,
    };
};

export default getDeviceInfo;
