/**
 * MELI Markeplace SDK
 * This is a the codebase to generate a SDK for Open Platform Marketplace
 *
 * The version of the OpenAPI document: 3.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import AttributesValueStruct from './AttributesValueStruct';
import AttributesValues from './AttributesValues';

/**
 * The Attributes model module.
 * @module model/Attributes
 * @version 3.0.0
 */
class Attributes {
    /**
     * Constructs a new <code>Attributes</code>.
     * @alias module:model/Attributes
     */
    constructor() { 
        
        Attributes.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Attributes</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Attributes} obj Optional instance to populate.
     * @return {module:model/Attributes} The populated <code>Attributes</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Attributes();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('value_id')) {
                obj['value_id'] = ApiClient.convertToType(data['value_id'], 'String');
            }
            if (data.hasOwnProperty('value_name')) {
                obj['value_name'] = ApiClient.convertToType(data['value_name'], 'String');
            }
            if (data.hasOwnProperty('value_struct')) {
                obj['value_struct'] = AttributesValueStruct.constructFromObject(data['value_struct']);
            }
            if (data.hasOwnProperty('values')) {
                obj['values'] = ApiClient.convertToType(data['values'], [AttributesValues]);
            }
            if (data.hasOwnProperty('attribute_group_id')) {
                obj['attribute_group_id'] = ApiClient.convertToType(data['attribute_group_id'], 'String');
            }
            if (data.hasOwnProperty('attribute_group_name')) {
                obj['attribute_group_name'] = ApiClient.convertToType(data['attribute_group_name'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} id
 */
Attributes.prototype['id'] = undefined;

/**
 * @member {String} name
 */
Attributes.prototype['name'] = undefined;

/**
 * @member {String} value_id
 */
Attributes.prototype['value_id'] = undefined;

/**
 * @member {String} value_name
 */
Attributes.prototype['value_name'] = undefined;

/**
 * @member {module:model/AttributesValueStruct} value_struct
 */
Attributes.prototype['value_struct'] = undefined;

/**
 * @member {Array.<module:model/AttributesValues>} values
 */
Attributes.prototype['values'] = undefined;

/**
 * @member {String} attribute_group_id
 */
Attributes.prototype['attribute_group_id'] = undefined;

/**
 * @member {String} attribute_group_name
 */
Attributes.prototype['attribute_group_name'] = undefined;

export default Attributes;

