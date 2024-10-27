import { useState, useEffect } from 'react';

const useFetchAddress = (position) => {
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAddress = async () => {
            if (position) {
                setLoading(true);
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`
                    );

                    if (!response.ok) {
                        throw new Error('Failed to fetch address');
                    }

                    const data = await response.json();
                    setAddress(data.display_name);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchAddress();
    }, [position]);

    return { address, loading, error };
};

export default useFetchAddress;
