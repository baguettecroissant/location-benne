export interface City {
    name: string;
    slug: string;
    zip: string;
    department_name: string;
    department_code: string;
    region: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    population?: number;
    department_info?: {
        code: string;
        name: string;
        region: string;
        aide_locale: string;
    };
}

export interface LeadFormData {
    ville: string;
    codePostal: string;
    typeDechet: 'gravats' | 'encombrants' | 'dechets-verts' | 'dib' | 'mixte';
    volume: '3' | '6' | '10' | '15' | '20' | '30';
    nom: string;
    telephone: string;
    email: string;
}
