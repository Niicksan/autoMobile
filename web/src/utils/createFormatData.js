export function createFormatData(data) {
    const formData = new FormData();

    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const value = data[key];

            if (key === 'images') {
                for (let i = 0; i < value.length; i++) {
                    const image = value[i];

                    if (image instanceof File) {
                        formData.append(key, image);
                    } else {
                        formData.append(key, JSON.stringify(image));
                    }
                }

                continue;
            } else if (key === 'geolocation') {
                formData.append(key, JSON.stringify(value));

                continue;
            }

            formData.append(key, value);
        }
    }

    return formData;
};