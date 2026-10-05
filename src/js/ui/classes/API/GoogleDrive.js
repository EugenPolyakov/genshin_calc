const DRIVE_CLIENT_ID = '91947417144-f6ms5ii6v48nu9h8lurvsn7d06nu7qn1.apps.googleusercontent.com' // prod
// const DRIVE_CLIENT_ID = '212641732900-mhmqk2643a60b0t2qmpadmu0ermht4cq.apps.googleusercontent.com' // dev
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata'
const DRIVE_DISCOVERY = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'

export class GoogleDrive {
    init(loginCallback, manual, token) {
        if (!this.client) {
            let params = {
                client_id: DRIVE_CLIENT_ID,
                scope: DRIVE_SCOPE,
                callback: (response) => {
                    this.setToken(response);
                    loginCallback();
                }
            };

            if (!manual) {
                params.prompt = 'none';
            }

            gapi.load('client', () => {
                this.client = google.accounts.oauth2.initTokenClient(params);

                gapi.client.load(DRIVE_DISCOVERY).then(() => {
                    if (token) {
                        this.setToken(token);
                        loginCallback();
                    } else {
                        this.requestLogin(manual);
                    }
                });
            });
        } else {
            if (token) {
                this.setToken(token);
                loginCallback();
            } else {
                this.requestLogin(manual);
            }
        }
    }

    setToken(response) {
        if (response && response.access_token) {
            this.response = response;
            gapi.client.setToken(response);
        }
    }

    isLogged() {
        if (this.hasAccess()) {
            return true
        }
        return false;
    }

    hasAccess() {
        return this.response && google.accounts.oauth2.hasGrantedAnyScope(this.response, DRIVE_SCOPE)
    }

    requestLogin(manual, hint) {
        this.response = null;
        if (manual) {
            this.client.requestAccessToken({prompt: 'select_account'})
        } else {
            this.client.requestAccessToken({
                prompt: 'none',
                hint: hint,
            })
        }
    }

    revoke() {
        if (this.response) {
            google.accounts.oauth2.revoke(this.response.access_token);
            this.response = undefined;
        }
    }

    async getFileId(fileName, dontCreate) {
        let fileId;

        let response = await gapi.client.drive.files.list({
            spaces: 'appDataFolder',
        });

        for (let file of response.result.files) {
            if (file.name == fileName && !fileId) {
                fileId = file.id
            } else {
                await this.delete(file.id)
            }
        }

        if (!fileId && !dontCreate) {
            let response = await gapi.client.drive.files.create({
                name: fileName,
                mimeType: 'application/json',
                parents: ['appDataFolder'],
            });

            if (response && response.result) {
                fileId = response.result.id;
            }
        }

        return fileId;
    }

    async download(fileId) {
        let file = await gapi.client.drive.files.get({
            fileId: fileId,
            alt: 'media'
        })

        return file.body;
    }

    async upload(fileId, content) {
        let response = await gapi.client.request({
            path: `/upload/drive/v3/files/${fileId}`,
            method: 'PATCH',
            params: {uploadType: 'media'},
            body: content,
        });

        return response.result.id;
    }

    async delete(fileId) {
        await gapi.client.drive.files.delete({fileId: fileId});
    }
}
