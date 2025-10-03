import React, { useState, useRef } from 'react';
import Header from '../components/common/Header';
import { Multiselect } from 'multiselect-react-dropdown';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Informe = () => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [informeType, setInformeType] = useState('PDF');
  const [informeData, setInformeData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const multiselectContainerRef = useRef(null);


  return (
    <div>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          flexGrow: 0,
          flexShrink: 0,
          height: '982px',
          paddingLeft: '384px',
          paddingRight: '384px',
          background: '#f3f4f6',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'stretch',
            flexGrow: 0,
            flexShrink: 0,
            gap: '40px',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: '48px',
            paddingBottom: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              flexGrow: 0,
              flexShrink: 0,
              gap: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignSelf: 'stretch',
                flexGrow: 0,
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <p
                style={{
                  alignSelf: 'stretch',
                  flexGrow: 0,
                  flexShrink: 0,
                  width: '712px',
                  fontSize: '36px',
                  fontWeight: 700,
                  textAlign: 'center',
                  color: '#0d141b',
                }}
              >
                Generador de Informes Personalizados
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                alignSelf: 'stretch',
                flexGrow: 0,
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <p
                style={{
                  alignSelf: 'stretch',
                  flexGrow: 0,
                  flexShrink: 0,
                  width: '712px',
                  fontSize: '18px',
                  textAlign: 'center',
                  color: '#1173d4',
                }}
              >
                <span
                  style={{
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    flexShrink: 0,
                    width: '712px',
                    fontSize: '18px',
                    textAlign: 'center',
                    color: '#1173d4',
                  }}
                >
                  Crea informes detallados comparando las políticas digitales de diferentes naciones.
                  Selecciona países, indicadores y el formato
                </span>
                <br />
                <span
                  style={{
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    flexShrink: 0,
                    width: '712px',
                    fontSize: '18px',
                    textAlign: 'center',
                    color: '#1173d4',
                  }}
                >
                  deseado para generar un informe a medida.
                </span>
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              flexGrow: 0,
              flexShrink: 0,
              gap: '48px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'stretch',
                flexGrow: 0,
                flexShrink: 0,
                width: '341.33px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  alignSelf: 'stretch',
                  flexGrow: 0,
                  flexShrink: 0,
                  gap: '16px',
                  padding: '25px',
                  borderRadius: '8px',
                  background: '#fff',
                  borderWidth: '1px',
                  borderColor: '#e5e7eb',
                  boxShadow: '0px 1px 2px 0 rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    flexShrink: 0,
                    position: 'relative',
                  }}
                >
                  <p
                    style={{
                      alignSelf: 'stretch',
                      flexGrow: 0,
                      flexShrink: 0,
                      width: '291.33px',
                      fontSize: '20px',
                      fontWeight: 600,
                      textAlign: 'left',
                      color: '#0d141b',
                    }}
                  >
                    Configuración
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    flexShrink: 0,
                    gap: '24px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'stretch',
                      flexGrow: 0,
                      flexShrink: 0,
                      position: 'relative',
                      gap: '4px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        alignSelf: 'stretch',
                        flexGrow: 0,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <p
                        style={{
                          alignSelf: 'stretch',
                          flexGrow: 0,
                          flexShrink: 0,
                          width: '291.33px',
                          fontSize: '14px',
                          fontWeight: 500,
                          textAlign: 'left',
                          color: '#374151',
                        }}
                      >
                        Países
                      </p>
                    </div>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        flexGrow: 0,
                        flexShrink: 0,
                        height: '50px',
                        position: 'relative',
                        borderRadius: '6px',
                        background: '#fff',
                        borderWidth: '1px',
                        borderColor: '#d1d5db',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          width: '291.33px',
                          height: '50px',
                          position: 'absolute',
                          left: '0px',
                          top: '0px',
                          overflow: 'hidden',
                          paddingLeft: '258.3299865722656px',
                          paddingRight: '9px',
                          paddingTop: '13px',
                          paddingBottom: '13px',
                        }}
                      >
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            flexGrow: 0,
                            flexShrink: 0,
                            width: '24px',
                            height: '24px',
                            position: 'relative',
                          }}
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M7.53027 9.59998L12.3303 14.4L17.1303 9.59998"
                            stroke="#6B7280"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          width: '237.33px',
                          position: 'absolute',
                          left: '13px',
                          top: '13px',
                          overflow: 'hidden',
                        }}
                      >
                        <p
                          style={{
                            flexGrow: 0,
                            flexShrink: 0,
                            fontSize: '16px',
                            textAlign: 'left',
                            color: '#1f2937',
                          }}
                        >
                          Selecciona países
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'stretch',
                      flexGrow: 0,
                      flexShrink: 0,
                      position: 'relative',
                      gap: '4px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        alignSelf: 'stretch',
                        flexGrow: 0,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <p
                        style={{
                          alignSelf: 'stretch',
                          flexGrow: 0,
                          flexShrink: 0,
                          width: '291.33px',
                          fontSize: '14px',
                          fontWeight: 500,
                          textAlign: 'left',
                          color: '#374151',
                        }}
                      >
                        Indicadores
                      </p>
                    </div>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        flexGrow: 0,
                        flexShrink: 0,
                        height: '50px',
                        position: 'relative',
                        borderRadius: '6px',
                        background: '#fff',
                        borderWidth: '1px',
                        borderColor: '#d1d5db',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          width: '291.33px',
                          height: '50px',
                          position: 'absolute',
                          left: '0px',
                          top: '0px',
                          overflow: 'hidden',
                          paddingLeft: '258.3299865722656px',
                          paddingRight: '9px',
                          paddingTop: '13px',
                          paddingBottom: '13px',
                        }}
                      >
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            flexGrow: 0,
                            flexShrink: 0,
                            width: '24px',
                            height: '24px',
                            position: 'relative',
                          }}
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M7.53027 9.59998L12.3303 14.4L17.1303 9.59998"
                            stroke="#6B7280"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          width: '237.33px',
                          position: 'absolute',
                          left: '13px',
                          top: '13px',
                          overflow: 'hidden',
                        }}
                      >
                        <p
                          style={{
                            flexGrow: 0,
                            flexShrink: 0,
                            fontSize: '16px',
                            textAlign: 'left',
                            color: '#1f2937',
                          }}
                        >
                          Selecciona indicadores
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'stretch',
                      flexGrow: 0,
                      flexShrink: 0,
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        alignSelf: 'stretch',
                        flexGrow: 0,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <p
                        style={{
                          alignSelf: 'stretch',
                          flexGrow: 0,
                          flexShrink: 0,
                          width: '291.33px',
                          fontSize: '14px',
                          fontWeight: 500,
                          textAlign: 'left',
                          color: '#374151',
                        }}
                      >
                        Formato del Informe
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        alignSelf: 'stretch',
                        flexGrow: 0,
                        flexShrink: 0,
                        gap: '16px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'stretch',
                          flexGrow: 0,
                          flexShrink: 0,
                          paddingLeft: '17px',
                          paddingRight: '17px',
                          paddingTop: '9px',
                          paddingBottom: '9px',
                          borderRadius: '6px',
                          background: '#1173d4',
                          borderWidth: '1px',
                          borderColor: '#1173d4',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            flexGrow: 0,
                            flexShrink: 0,
                            position: 'relative',
                          }}
                        >
                          <p
                            style={{
                              flexGrow: 0,
                              flexShrink: 0,
                              fontSize: '14px',
                              fontWeight: 500,
                              textAlign: 'left',
                              color: '#fff',
                            }}
                          >
                            PDF
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'stretch',
                          flexGrow: 0,
                          flexShrink: 0,
                          paddingLeft: '17px',
                          paddingRight: '17px',
                          paddingTop: '9px',
                          paddingBottom: '9px',
                          borderRadius: '6px',
                          borderWidth: '1px',
                          borderColor: '#d1d5db',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            flexGrow: 0,
                            flexShrink: 0,
                            position: 'relative',
                          }}
                        >
                          <p
                            style={{
                              flexGrow: 0,
                              flexShrink: 0,
                              fontSize: '14px',
                              fontWeight: 500,
                              textAlign: 'left',
                              color: '#374151',
                            }}
                          >
                            CSV
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'stretch',
                flexGrow: 0,
                flexShrink: 0,
                width: '730.67px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  alignSelf: 'stretch',
                  flexGrow: 0,
                  flexShrink: 0,
                  gap: '16px',
                  padding: '25px',
                  borderRadius: '8px',
                  background: '#fff',
                  borderWidth: '1px',
                  borderColor: '#e5e7eb',
                  boxShadow: '0px 1px 2px 0 rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    flexShrink: 0,
                    position: 'relative',
                  }}
                >
                  <p
                    style={{
                      alignSelf: 'stretch',
                      flexGrow: 0,
                      flexShrink: 0,
                      width: '680.67px',
                      fontSize: '20px',
                      fontWeight: 600,
                      textAlign: 'left',
                      color: '#0d141b',
                    }}
                  >
                    Vista Previa del Informe
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    flexShrink: 0,
                    overflow: 'hidden',
                    padding: '1px',
                    borderRadius: '8px',
                    borderWidth: '1px',
                    borderColor: '#e5e7eb',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      alignSelf: 'stretch',
                      flexGrow: 0,
                      flexShrink: 0,
                      gap: '4px',
                      padding: '24px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        alignSelf: 'stretch',
                        flexGrow: 0,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <p
                        style={{
                          alignSelf: 'stretch',
                          flexGrow: 0,
                          flexShrink: 0,
                          width: '630.67px',
                          fontSize: '18px',
                          fontWeight: 700,
                          textAlign: 'left',
                          color: '#0d141b',
                        }}
                      >
                        Informe de Políticas Digitales
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        alignSelf: 'stretch',
                        flexGrow: 0,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <p
                        style={{
                          alignSelf: 'stretch',
                          flexGrow: 0,
                          flexShrink: 0,
                          width: '630.67px',
                          fontSize: '16px',
                          textAlign: 'left',
                          color: '#1173d4',
                        }}
                      >
                        Vista previa del informe generado. Revisa los datos y el formato antes de
                        descargar.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    flexShrink: 0,
                    paddingTop: '8px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexGrow: 0,
                      flexShrink: 0,
                      gap: '7.989999771118164px',
                      paddingLeft: '24px',
                      paddingRight: '24px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      borderRadius: '6px',
                      background: '#1173d4',
                      boxShadow: '0px 1px 2px 0 rgba(0,0,0,0.05)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        flexGrow: 0,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <svg
                        width="24"
                        height="28"
                        viewBox="0 0 24 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          flexGrow: 0,
                          flexShrink: 0,
                          width: '24.01px',
                          height: '27.99px',
                          position: 'relative',
                        }}
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M12.005 17.8814L7.14592 13.0223L8.50647 11.6132L11.0332 14.1399V6.2196H12.9768V14.1399L15.5036 11.6132L16.8641 13.0223L12.005 17.8814ZM6.1741 21.7687C5.6396 21.7687 5.18204 21.5784 4.80141 21.1977C4.42078 20.8171 4.23047 20.3595 4.23047 19.825V16.9096H6.1741V19.825H17.8359V16.9096H19.7795V19.825C19.7795 20.3595 19.5892 20.8171 19.2086 21.1977C18.828 21.5784 18.3704 21.7687 17.8359 21.7687H6.1741Z"
                          fill="white"
                        ></path>
                      </svg>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexGrow: 0,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      <p
                        style={{
                          flexGrow: 0,
                          flexShrink: 0,
                          fontSize: '16px',
                          fontWeight: 700,
                          textAlign: 'center',
                          color: '#fff',
                        }}
                      >
                        Generar y Descargar Informe
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informe;