import React from 'react';

function SuccessfulReset() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Password Reimpostata con Successo</h2>
                            <p className="text-center">La tua password è stata reimpostata con successo. Ora puoi accedere utilizzando la tua nuova password.</p>
                            <div className="text-center">
                                <a href="/login" className="btn btn-primary btn-lg px-5 py-3">Accedi</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccessfulReset;
