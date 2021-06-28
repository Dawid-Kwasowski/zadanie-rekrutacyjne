export default class iconsHelper {
	
	static resolveIcon(mimeType) {

		const officeFormats = [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.text',
            'application/rtf',
        ];

        const spreadsheetFormats = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.oasis.opendocument.spreadsheet',
        ];

        const presentationFormats = [
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.oasis.opendocument.presentation'
        ];

        if('application/pdf' === mimeType) {

            return {

                icon: 'picture_as_pdf',
                color: 'red'

            }

        }else if('image' === mimeType.split('/')[0]) {

            return {

                icon: 'image',
                color: 'red'

            }

        }else if('video' === mimeType.split('/')[0]) {

            return {

                icon: 'video_camera_back',
                color: 'green'

            }

        }else if('audio' === mimeType.split('/')[0]) {

            return {

                icon: 'graphic_eq',
                color: 'red'

            }

        }else if('text/plain' === mimeType) {

            return {

                icon: 'sticky_note_2',
                color: 'grey'

            }

        }else if(officeFormats.includes(mimeType)) {

            return {

                icon: 'article',
                color: 'blue'

            }

        }else if(spreadsheetFormats.includes(mimeType)) {

            return {

                icon: 'fas fa-file-excel',
                color: 'green darken-2'

            }

        }else if(presentationFormats.includes(mimeType)) {

            return {

                icon: 'fas fa-file-powerpoint',
                color: 'deep-orange darken-2'

            }

        }else {

            return {

                icon: 'far fa-file',
                color: 'amber darken-2'

            }

        }

	}
	
}