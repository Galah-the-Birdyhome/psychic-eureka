import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { GlobalConst } from 'constants/index';
import Option from './Option';
import { useTranslation } from 'react-i18next';
import { Connection, getConnections, injectedConnection } from 'connectors';
import { getIsMetaMaskWallet } from 'connectors/utils';

interface PendingViewProps {
  connection?: Connection;
  error?: boolean;
  setPendingError: (error: boolean) => void;
  tryActivation: (connector: Connection) => void;
}

const PendingView: React.FC<PendingViewProps> = ({
  connection,
  error = false,
  setPendingError,
  tryActivation,
}) => {
  const { t } = useTranslation();
  const { ethereum, phantom } = window as any;
  const isMetamask = getIsMetaMaskWallet();
  const isBlockWallet = ethereum && ethereum.isBlockWallet;
  const isCypherD = ethereum && ethereum.isCypherD;
  const isBitKeep = ethereum && ethereum.isBitKeep;
  const isBraveWallet = ethereum && ethereum.isBraveWallet;
  const isPhantomWallet =
    (ethereum && ethereum.isPhantom) || (phantom && phantom.ethereum);
  const isTrustWallet = ethereum && ethereum.isTrustWallet;
  const connections = getConnections();

  return (
    <Box className='pendingSection'>
      <Box className='flex items-center justify-center' mb={4}>
        {error ? (
          <Box className='errorGroup'>
            <p>{t('errorConnect')}</p>
            <Box
              className='errorButton'
              onClick={() => {
                setPendingError(false);
                connection && tryActivation(connection);
              }}
            >
              {t('tryagain')}
            </Box>
          </Box>
        ) : (
          <>
            <CircularProgress />
            <p style={{ marginLeft: 12 }}>{t('initializing')}...</p>
          </>
        )}
      </Box>
      {connections.map((option) => {
        if (connection && option.connector === connection.connector) {
          if (option.connector === injectedConnection.connector) {
            if (isMetamask && option.name !== GlobalConst.walletName.METAMASK) {
              return null;
            }
            if (
              !isMetamask &&
              option.name === GlobalConst.walletName.METAMASK
            ) {
              return null;
            }
            if (isBitKeep && option.name !== GlobalConst.walletName.BITKEEP) {
              return null;
            }
            if (!isBitKeep && option.name === GlobalConst.walletName.BITKEEP) {
              return null;
            }
            if (isCypherD && option.name !== GlobalConst.walletName.CYPHERD) {
              return null;
            }
            if (!isCypherD && option.name === GlobalConst.walletName.CYPHERD) {
              return null;
            }
            if (
              isBlockWallet &&
              option.name !== GlobalConst.walletName.BLOCKWALLET
            ) {
              return null;
            }
            if (
              !isBlockWallet &&
              option.name === GlobalConst.walletName.BLOCKWALLET
            ) {
              return null;
            }
            if (
              isBraveWallet &&
              option.name !== GlobalConst.walletName.BRAVEWALLET
            ) {
              return null;
            }
            if (
              !isBraveWallet &&
              option.name === GlobalConst.walletName.BRAVEWALLET
            ) {
              return null;
            }
            if (
              isPhantomWallet &&
              option.name !== GlobalConst.walletName.PHANTOM_WALLET
            ) {
              return null;
            }
            if (
              !isPhantomWallet &&
              option.name === GlobalConst.walletName.PHANTOM_WALLET
            ) {
              return null;
            }
            if (
              isTrustWallet &&
              option.name !== GlobalConst.walletName.TRUST_WALLET
            ) {
              return null;
            }
            if (
              !isTrustWallet &&
              option.name === GlobalConst.walletName.TRUST_WALLET
            ) {
              return null;
            }
          }
          return (
            <Option
              id={`connect-${option.key}`}
              key={option.key}
              clickable={false}
              color={option.color}
              header={option.name}
              subheader={option.description}
              icon={option.iconName}
            />
          );
        }
        return null;
      })}
    </Box>
  );
};

export default PendingView;
