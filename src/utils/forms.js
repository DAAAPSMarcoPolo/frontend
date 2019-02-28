export function getAttributesFromEvent(attributes, event) {
    const formData = {}
    for (let i in attributes) {
        let attribute = attributes[i];
        if (!event.target[attribute]) {
            console.log(`Error: field "${attribute}" not found. Check that you are passing in the correct attribute name.`)
        }
        formData[attribute] = event.target[attribute].value
    }
    return formData;
}