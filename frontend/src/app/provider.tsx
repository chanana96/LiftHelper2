import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { queryConfig } from 'lib/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { NotFound } from 'routes/NotFound';

type AppProviderProps = {
	children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
	const [queryClient] = React.useState(
		() =>
			new QueryClient({
				defaultOptions: queryConfig,
			}),
	);
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<ErrorBoundary FallbackComponent={NotFound}>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</ErrorBoundary>
		</React.Suspense>
	);
};
