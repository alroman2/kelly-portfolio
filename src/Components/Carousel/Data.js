
/**
 *  CD {
 *      name: "Group Name",
 *      data: [
 *          "images",
 *      ]
 * }
 */
class CarouselData {

    constructor() {
        this.group = {
            
        }
    }

    /** Add a data group to the carousel data model */
    addDataGroup(name, data) {
        this.group = {...CarouselData, {
            "name": name,
            
        }};
    }
};