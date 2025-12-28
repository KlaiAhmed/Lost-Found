const calculateTimePassed = (createdAt: string) => {
    const now = new Date().getTime();
    const createdDate = new Date(createdAt);
    const diffInSec = (now - createdDate.getTime())/1000;

    const units = [
        { label: 'year',   secs: 31536000 },
        { label: 'month',  secs: 2592000 },
        { label: 'week',   secs: 604800 },
        { label: 'day',    secs: 86400 },
        { label: 'hour',   secs: 3600 },
        { label: 'minute', secs: 60 },
    ];

    for (const { label, secs } of units) {
        const amount = Math.floor(diffInSec / secs);
        if (amount >= 1) {
            return `${amount} ${label}${amount !== 1 ? 's' : ''} ago`;
        }
    }
    return 'Just now';
};

export default calculateTimePassed;